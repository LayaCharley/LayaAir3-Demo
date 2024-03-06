declare type MsgType = 'frameData' | 'initPerformance' | 'selectPlayer' | 'start';
declare type InternalMsgType = MsgType | 'onSelectMe' | 'onSelectMe_back' | 'active' | 'heart' | 'getPerformanceConf' | 'getPerformanceConf_back' | 'selectPlayer_back' | 'playerList' | 'onReady' | 'onChangePlayer' | 'msgList' | 'onSelectPlayer';
export default class ProfileHelper {
    private socketManager;
    private performanceDataTool;
    selectPlayerId: number;
    private heartIntervalHandler;
    private active;
    static Host: string;
    selectPlayerStatus: number;
    private static instance;
    private static _enable;
    static set enable(value: boolean);
    static get enable(): boolean;
    init(type: 'player' | 'profiler', performanceDataTool?: any, onOpen?: (event: any) => void, onMessage?: (event: {
        type: InternalMsgType;
        data: any;
    }) => void, retryConnectCount?: number, retryConnnectDelay?: number): void;
    sendMsg: (type: MsgType, data: any, toId?: any) => void;
    private sendInternalMsg;
    private frameDataList;
    private sendFramData;
    private sendConfigData;
    sendFramDataList: (dataList: any[]) => void;
    dispose(): void;
    private static initOption;
    static init(type: 'player' | 'profiler', performanceDataTool?: any, onOpen?: (event: any) => void, onMessage?: (event: {
        type: InternalMsgType;
        data: any;
    }) => void, retryConnectCount?: number, retryConnnectDelay?: number): void;
    static sendFramData: (data: any | any[]) => void;
    static sendConfigData: (data: any | any[]) => void;
    static dispose: () => void;
}
export {};
