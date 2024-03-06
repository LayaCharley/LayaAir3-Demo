const defaultOptions = {
    autoRetryConnnect: true,
    retryConnnectCount: 0,
    retryConnnectDelay: 10000
};
let WebSocketCls = window.WebSocket;
class SocketManager {
    constructor(host, port, name, type, options) {
        this.clientId = 0;
        this.socket = null;
        this.isSupport = false;
        this.status = 0;
        this.retryConnnectCount = 0;
        this.onClose = (ev) => {
            let { onClose, autoRetryConnnect, retryConnnectCount } = this.options;
            retryConnnectCount = retryConnnectCount || 0;
            if (onClose) {
                onClose(ev);
            }
            if (this.status === 0) {
                if (autoRetryConnnect &&
                    (retryConnnectCount == 0 || this.retryConnnectCount < retryConnnectCount)) {
                    this.delayRetryConnnect();
                }
            }
        };
        this._delayRetryConnnectTimer = 0;
        this._delayRetryConnnect = () => {
            clearTimeout(this._delayRetryConnnectTimer);
            this.retryConnnectCount++;
            this.reConnect();
        };
        this.onMessage = (ev) => {
            const { onMessage } = this.options;
            if (onMessage) {
                onMessage(ev);
            }
        };
        this.onError = (ev) => {
            const { onError } = this.options;
            if (onError) {
                onError(ev);
            }
        };
        this.onOpen = (ev) => {
            const { onOpen } = this.options;
            if (onOpen) {
                onOpen(ev);
            }
            this.retryConnnectCount = 0;
            clearTimeout(this._delayRetryConnnectTimer);
        };
        this.url = 'ws://' + host + ":" + port + '?type=' + type + '&name=' + name;
        if (options) {
            Object.assign(options, defaultOptions);
            this.options = options;
        }
        else {
            this.options = defaultOptions;
        }
        WebSocketCls = window.WebSocket;
        this.isSupport = (typeof WebSocketCls != 'undefined');
        if (this.isSupport) {
            this.reConnect();
        }
        else {
            console.log('not support websocket');
        }
    }
    closeConnect() {
        this.retryConnnectCount = 0;
        if (this.socket) {
            let socket = this.socket;
            socket.onclose = null;
            socket.onmessage = null;
            socket.onerror = null;
            socket.onopen = null;
            socket.close();
            this.socket = null;
        }
        this.status = 0;
    }
    delayRetryConnnect() {
        clearTimeout(this._delayRetryConnnectTimer);
        if (ProfileHelper.enable) {
            this._delayRetryConnnectTimer = setTimeout(this._delayRetryConnnect, this.options.retryConnnectDelay);
        }
    }
    reConnect() {
        let socket = new WebSocketCls(this.url);
        this.socket = socket;
        socket.onclose = this.onClose;
        socket.onmessage = this.onMessage;
        socket.onerror = this.onError;
        socket.onopen = this.onOpen;
    }
    dispose() {
        this.closeConnect();
    }
    send(msg) {
        if (this.socket && this.socket.readyState === 1) {
            this.socket.send(msg);
            return true;
        }
        return false;
    }
}
const getParameterByName = function (name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
const idIsInList = (id, list) => {
    for (let i = 0; i < list.length; i++) {
        let info = list[i];
        if (info.id == id) {
            return true;
        }
    }
    return false;
};
export default class ProfileHelper {
    constructor() {
        this.socketManager = null;
        this.selectPlayerId = 0;
        this.active = 0;
        this.selectPlayerStatus = 0;
        this.sendMsg = (type, data, toId = 0) => {
            this.socketManager.send(JSON.stringify({
                type: type,
                data: data,
                toId: toId
            }));
        };
        this.sendInternalMsg = (type, data, toId = 0) => {
            this.socketManager.send(JSON.stringify({
                type: type,
                data: data,
                toId: toId
            }));
        };
        this.frameDataList = [];
        this.sendFramData = (data) => {
            if (!this.active) {
                return;
            }
            this.frameDataList.push(data);
            if (this.frameDataList.length >= 30) {
                this.sendFramDataList(this.frameDataList);
                this.frameDataList.length = 0;
            }
        };
        this.sendConfigData = (data = null) => {
            let configData = this.performanceDataTool.getPathInfo();
            this.sendInternalMsg('getPerformanceConf_back', configData);
        };
        this.sendFramDataList = (dataList) => {
            let list = dataList.map((data) => {
                return {
                    type: "frameData",
                    data: data
                };
            });
            ;
            this.sendInternalMsg("msgList", list);
        };
    }
    static set enable(value) {
        if (ProfileHelper._enable === value) {
            return;
        }
        ProfileHelper._enable = value;
        if (value) {
            const initOption = ProfileHelper.initOption;
            if (!initOption) {
                throw new Error('没有执行初始化init');
            }
            const { type, performanceDataTool, onOpen, onMessage, retryConnectCount, retryConnnectDelay } = initOption;
            ProfileHelper.init(type, performanceDataTool, onOpen, onMessage, retryConnectCount, retryConnnectDelay);
        }
        else {
            ProfileHelper.dispose();
        }
    }
    static get enable() {
        return ProfileHelper._enable;
    }
    init(type, performanceDataTool, onOpen, onMessage, retryConnectCount, retryConnnectDelay) {
        this.frameDataList = [];
        if (type === 'player' && !performanceDataTool) {
            throw new Error("type为player时，performanceDataTool不为空");
        }
        var host = '';
        var url = '';
        var href = '';
        if (window && window.location && window.location.href) {
            href = window.location.href;
        }
        var name = getParameterByName('profileName', href) || '';
        var port = getParameterByName('profilePort', href) || '1050';
        if (ProfileHelper.Host || getParameterByName('profileHost', href)) {
            host = ProfileHelper.Host || getParameterByName('profileHost', href);
        }
        else {
            if (href.startsWith('http')) {
                var index1 = href.indexOf('//');
                var index2 = href.indexOf('/', index1 + 3);
                if (index2 === -1) {
                    index2 = href.length;
                }
                url = href.substring(index1 + 2, index2);
                index2 = url.indexOf(':');
                if (index2 >= 0) {
                    url = url.substring(0, index2);
                }
                host = url;
            }
            else {
                host = 'localhost';
            }
        }
        this.performanceDataTool = performanceDataTool;
        this.heartIntervalHandler = setInterval(() => {
            this.sendInternalMsg('heart', {});
        }, 1000 * 10);
        this.socketManager = new SocketManager(host, port, name, type, {
            retryConnectCount: retryConnectCount || defaultOptions.retryConnnectCount,
            retryConnnectDelay: retryConnnectDelay || defaultOptions.retryConnnectDelay,
            onMessage: (ev) => {
                if (!this.socketManager) {
                    return;
                }
                if (typeof ev.data == 'string') {
                    let data = JSON.parse(ev.data);
                    let msgList = [data];
                    if (data.type === 'msgList') {
                        msgList = data.data;
                    }
                    msgList.forEach((eventData) => {
                        switch (eventData.type) {
                            case 'onSelectMe':
                                this.sendInternalMsg('onSelectMe_back', eventData.data);
                                break;
                            case 'getPerformanceConf':
                                this.sendConfigData();
                                break;
                            case 'selectPlayer_back':
                                this.selectPlayerId = eventData.data.selectPlayer;
                                this.selectPlayerStatus = 0;
                                break;
                            case 'onReady':
                                this.socketManager.clientId = eventData.data.id;
                                this.sendInternalMsg('start', {});
                                break;
                            case 'active':
                                this.active = eventData.data.active;
                                break;
                            case 'playerList':
                                if (this.selectPlayerId) {
                                    if (!idIsInList(this.selectPlayerId, eventData.data)) {
                                        this.selectPlayerId = 0;
                                        this.selectPlayerStatus = 0;
                                    }
                                }
                                if (this.selectPlayerId && eventData.data.length > 0 && this.selectPlayerStatus == 0) {
                                    let playerId = eventData.data[0].id;
                                    this.selectPlayerStatus = 1;
                                    this.sendMsg('selectPlayer', { id: playerId });
                                }
                                break;
                        }
                    });
                    if (onMessage) {
                        msgList.forEach((msgData) => {
                            onMessage(msgData);
                        });
                    }
                }
            },
            onOpen: (ev) => {
                if (onOpen) {
                    onOpen(ev);
                }
            },
            onError: (ev) => {
            },
            onClose: (ev) => {
            }
        });
    }
    dispose() {
        clearInterval(this.heartIntervalHandler);
        if (this.socketManager) {
            this.socketManager.dispose();
            this.socketManager = null;
        }
        this.performanceDataTool = null;
    }
    static init(type, performanceDataTool, onOpen, onMessage, retryConnectCount, retryConnnectDelay) {
        if (ProfileHelper.instance) {
            ProfileHelper.instance.dispose();
        }
        ProfileHelper.initOption = {
            type,
            performanceDataTool,
            onOpen,
            onMessage,
            retryConnectCount,
            retryConnnectDelay
        };
        if (!ProfileHelper._enable) {
            return;
        }
        ProfileHelper.instance = new ProfileHelper();
        ProfileHelper.instance.init(type, performanceDataTool, onOpen, onMessage, retryConnectCount, retryConnnectDelay);
    }
}
ProfileHelper.sendFramData = (data) => {
    if (!ProfileHelper._enable) {
        return;
    }
    if (ProfileHelper.instance) {
        ProfileHelper.instance.sendFramData(data);
    }
};
ProfileHelper.sendConfigData = (data) => {
    if (!ProfileHelper._enable) {
        return;
    }
    if (ProfileHelper.instance) {
        ProfileHelper.instance.sendConfigData(data);
    }
};
ProfileHelper.dispose = () => {
    if (ProfileHelper.instance) {
        ProfileHelper.instance.dispose();
    }
    ProfileHelper.instance = null;
};
