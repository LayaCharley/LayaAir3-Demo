import { Base64Atlas } from "../tools/Base64Atlas";
export class Base64AtlasManager {
    constructor() {
    }
    static replaceRes(uiO) {
        Base64AtlasManager.base64.replaceRes(uiO);
    }
}
Base64AtlasManager.dataO = { "comp/button1.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABRCAYAAAApS3MNAAABSUlEQVR4Xu3a0QmFMADFUJ1JXM0h3moPZ6qg4AoNeLqAIenFn65jjLE40w2sQkxvcAMI0eggRKSDEEJUDEQ4/COEiBiIYFiEEBEDEQyLECJiIIJhEUJEDEQwLEKIiIEIhkUIETEQwbAIISIGIhgWIUTEQATDIoSIGIhgWIQQEQMRDIsQImIggnEvYvv9IzjfxDiP/XlgJsTcCyDEXP/v14UQImIggmERQkQMRDAsQoiIgQiGRQgRMRDBsAghIgYiGBYhRMRABMMihIgYiGBYhBARAxEMixAiYiCCYRFCRAxEMCxCiIiBCMa7iAjPpzG8fY3kF0KIiIEIhkUIETEQwbAIISIGIhgWIUTEQATDIoSIGIhgWIQQEQMRDIsQImIggmERQkQMRDAsQoiIgQiGRQgRMRDBsAghIgYiGBYhRMRABMMihIgYiGBcGJiOHTRZjZAAAAAASUVORK5CYII=", "comp/line2.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAECAYAAACOXx+WAAAAG0lEQVQYV2NkoDJgpLJ5DIxtra3/qWko1V0IAJvgApS1libIAAAAAElFTkSuQmCC", "view/create.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAAAdElEQVQ4T2NkwAIWLFjwH5t4QkICIyM2CXQxmAHka/j///9mXDYxMjL6YtgwBDUg+w8crIT8MBQ0oEca55JvWNPS9xgu4tISzADyNfz///8MnrRkgmHDENSALWng9fRQ0DA40xLecglbWhpqGoZCMUNKUQkANAHAJVkE5XwAAAAASUVORK5CYII=", "view/rendertime.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAABeUlEQVQ4T+2Uv0tCURSAvyNdcwiXBlsaaomWFgeHlqAtCPsDJHwIiUtDSxERtErtmQ6CjkHo4FpDBQ0tbVFR0BYE0eQvOnFF7T17QlOTd3m88873OD8+rtA9uVzOBIPBlIisAwvd8B1QajQahXQ63bIx6QHFYrEEJHrv7qeqZhzHOfYA+Xw+Yow5B+YHoGwymdxW1QAQEFWNAk8i8uEDuZM3gUcLZIEJYNcNqWrVcZyd7p9t8jLwYIFTYBx47UHlcjmcSCQ+B5JtpU0LnAFj3br7kE+yTalb4BCYczVqoT3AjteW4T73FlgFNgY+1IGQz4hPLGCAI2DGbweu2Auw1Vmcqk4C+8DsEOgZOBCR9/6mVdU2vgIsAdOuIVwANRFpezatuahpTYVSop1m+y6pasm8NQqSvvW61KwslkSHuCRkgvErr0taiUXaal1Sr0siWRO/9HfpF+RN9nfpB/qqmrXrv7mktVhYVm5GLo1cct9LI5e8d84/3UvfAgdlKH0EO7MAAAAASUVORK5CYII=", "view/cache.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAkCAYAAABSSLCCAAAAcElEQVQ4T2NcsGDB/4SEBEYGBgYGYtmMxCpENhhsA6mA8f///5tHNTEwkBcQpIYcSD15kUtWigi51vR/jVYdOGUQy2YkViGywWSnvTOkhiAonkY1gZIRqSEHTntkRe4g10RWQIyWe5Bgo2O5R7dkBADztyP+yFzirAAAAABJRU5ErkJggg==", "comp/clip_selectBox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAAAsElEQVRoQ+3ZQQ0AMQzEwAuqEgh/Sj2pKObhIrBsrfLonHPu12MMTEGYFg+kIFaPgmA9ClIQzQDG0w0pCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBmd/tTh6IUBIrx/tRbiFWkIFaPFoL1KEhBNAMYTzekIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LwYL8U/BE1dCJ3PsAAAAASUVORK5CYII=", "comp/label.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAASCAYAAACQCxruAAAAmElEQVRoQ+3aMQqAQBBDUef+hx4Zq1mrbPnhWylECHmghVZ397OOqqp97TlugdNzgEXFIaaFuwROt0LmBEay5aXb920+FjIpMJItLy1wvhUyKTCSLS8tcL4VMikwki0vLXC+FTIpMJItLy1wvhUyKTCSLS89wPP1Qeh8M0zy+84gMMbruqjA15OxbtjAu7mPa5bj0fb/A8cLgD4n/wQKNiIAAAAASUVORK5CYII=", "comp/clip_tree_arrow.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAwUlEQVQoU5WRPRKCMBCFWUt6vYQeB06RUDpoBbFDa7yDwm30FGi9dHnOMiQDBgvT5c3b7+0PRVEUlVV9A3NmzL6T//SRfMz5CgCdtVafjlmzaHAigAbM2tE8YVo1pf0yvABoc9D3wACgBbMKIgD4qqDJsqqlMV8VGL5n/88geCJKlijSMBXFZUNx/CSi9WwX1r7R99thzKKqkxXRbMUWSE2u2sEwHsxHCbrMVSq6N4xRD9HAvJstylEkarhurlqnfQC58YP5+CvQNwAAAABJRU5ErkJggg==", "view/bg_panel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMUlEQVRYR+3QQREAAAjDMGZk/l2CDD6pgl7SduexGCBAgAABAgQIECBAgAABAgS+BQ4oyStBhXcy5AAAAABJRU5ErkJggg==", "view/bg_top.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMUlEQVRYR+3QQREAAAjDMKZp/rWBDD6pgl7SduexGCBAgAABAgQIECBAgAABAgS+BQ6WyDMhXMLeQgAAAABJRU5ErkJggg==", "view/clickselect.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAACfElEQVRIS8WVO2iTYRSGn5OWqpMOurg0VRBdVVCsg7GgDjpZECyirl4GEYfSgBlaB5VSpApdxCJIoeKgg7dKC21ALahIiyiKKUjxAiI4qCH1lRP/hPhfAnHpGZPv+c4573nP95ukO/xHmINmtq8RtswsPiipB/gAPAFem5nCbcSWKukIsD84/A2YBh4DL8ysWLkk0qOkDcD5GLF+Ac+Ap35ZHGjAdWB5gtJvgZFYVSWdBHaFwBlg1Mw8K0ngFiAbAm+a2XBij/6HpBbgBrAEmAVeAZ1AFU40QDCWrcBZL0/S4Vq4HtgB7DWzU5XyauDBMhhWz70ryVVdb2ZuhGpI2g1MODjfiMFrxZk3s9WNwJ6snHFxQUlXgXfAPeC5mf2O2Y5oqZLcMceCw1+AseCSSTP7mSiOpM3A7RixfvgYgAd+WUQcSSnfPWBlgtIvgf5YVSVdBA6GQF/mS2bmWcvbERmHJF+payFw0MzO1TWApKXBViwL3h5/Pk4AVTjRAMFY9njJXl6wLccrcD3wAHDUzBwuRw18JtbkbkFJruomM7sf2o4u4Jals/mFRgxeFcfBQm97UyOwM+WMiwums/k3QnMps+HWpuLIRC5TCrcRW2pbT35MRiY4XDRsVmiU5uJQIZfxb0k5Ij229eQPySJ287MLGO8Rd1M0XY6AO3LjzYVSy3fAH+VICL4a6o9VtTWbnzbYGKI+IrtQ6Ns2EFuq/5jOTnWD9f4DikeFvvbqhyg2Yzo3voJSy2fAjfEJMYPRQQ2caAAfC7AW2WkvrzU79dCwnRW4Hjgg6JrrbV9VKbkKw1Csyd2Ca7on1y2krHOub3t16//2n79SarbsH7BKtfejoCjmAAAAAElFTkSuQmCC", "view/resize.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAABeUlEQVRIS+2UvUpdURCFvxXRKJpIEBURsVAIiiBoaaGCjY2VLyH4MBaCPoWlnQlpI6SxsQmkURQL5eK/6JK57iuRnMPZtxAkuOFUhzWz96xvjcg8tluAT5LOQqJMHba/AgPAD0nOEtruAOaB6Lon6U+ucAoYTLe7Bb5XCm1/BCaAXqAVOAHyOkYn27PA5/TGWmXHxvBeT2i7TVIM4MUp7ZhGPlY3V/pVKUxEjAIjyac74LIAjK70PwCoyfYXYDJwyqDoHtiRdFOfql0naBgIrILF/ZIi1yH6h1XbYXCPpKOq7s34GEX7JB00m445YBzYlPSQ1dF2N7CaWN2W9DNXuJxAj1uGVeuVQtvh32LyuR34DexWCv+CfAXoBzYkHb8Boe1OSRcFkBdfNY18IQiUtFUpTJjNAPEFHVfAaQFyjZ3zNBzbQ8BSWkZViEbk1uIpjXR8AKbT7jwEvpVUqEk6L0pHLN5hSWWxeq7XjI/v6Sgz0vZ7Ov7DdDwCkcb1m86tSukAAAAASUVORK5CYII=", "view/clickanalyse.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAAC7UlEQVRIS5WWT2hUZxTFfyfGFolkoUVKrHQiEaX+IfgHa54UQzUqpWYhLbQU6ULNwgYXuog6yiiTgK2LgtAu6yqbFkpRBEURQzJEBN200NqKkxoDLnQhFUrizJU7vje8SSbzZr7FwDy+c75z7z3nfU80uMxMDin9JC0zewvYAHwIrAH65wWaWQuwOdy8CVgUHnBd0sUKoJktBbYC24B1QHMVNeck3ZWZrYhtXpUg/3/gS0kzDnT2/cDqpFqBUUnnK5pjZutDgo01Tr0g6XbVrprZypBgO9AUU/EK+ErSyzLQzC5XkTkCfBR7fl/Smeh/qasOlPRp9DAkOgp8H5P9o6SriUAnMrOzgNdswNeSntcL9IYNAQ8kHYuXU5Y6u8ZIupldAO5I+nkOsNb8wjk/ljTZKFCSvMbSMrPSiOpNx9uAz3UP4IbfWSsdrcDH4eZuYHF46LCk47PT8S6wG9gbJmRhlfoPSLrhJvdERJs7E+S73dZKmnagsx8JB50UEHdY3+x0dIUEO2qcekTSr/OlY21I4N5dEJMwA6yX9CKejqkqGn8DemPPb0v6YrZXpyS1xYbsRD3AtZjsk5IuJQKdyMyGAa/ZnbNR0tN6gd6wXwAP8SfV0jGnxki6mV1xyf4ubdTkPue/Jf3TEJCMNZFRMQLtyNwqvaTrSkdHZry1MFM8bLLPgY5U8/SyeYHvncotb5b1A/t8c2QGg3sT2WBLBbD95PiGogr9Ej0Gbap8r4ZJ5kR+MPhW7WdGd5npEFaa15IE+YWW5uklf2S6/1N7OnfasG+Ad5KiAfyVzwYfVDQnlc71YTaA8Ntrvtq/y2eDgapdTZ0a60UMhjdvmcCgWDClJge7npSBqfRYYY5M6U/M/NqO1mQ+G7xf4VUH5rNBOXtviLQfzH0afizop0fZroOJQCdKpcfyUKrZFhTpfDgU/F4nMNcH9gPwLJ8Nls3xarUaI+mp9NhTg5GJbPBZQyb3OReayP17rutmHPga1PpCOk+zrlEAAAAASUVORK5CYII=", "view/res.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAADwUlEQVRIS+3WT2gcdRQH8O/b2SwNC7l4MAEPvbilUkoPOUmLjSDrZn4hxYKH/kGwyB4tQogiu/N+GymyoWguhVBQKKkHQTHsW9fUQwqKp4AgtMXkInhILl4CkoTdmSe/6XZp2pntLli8uMedt9/3mze/33yW8Jw+9Jxy0TeYmV8FcFVVTxPRiwA6AP5U1TvZbHapUqn8nrawxGBVJWvtNVWdJ6K05h1V/dhaW08KT/wRM1sAVQCRqn5JRLdyudw9Iora7faJKIrKqnrBNSWiahAEC0+GHwpm5utEdD+KopsuBMDbzPxt0oqstRdV9Za7lslkzlar1Z8erzsUHATBJhG93C34fmJi4ly5XG6nzTEIgjoRzanqkrX2amowM98F8Fq3wK34PWb+Ii14cXExv7e3V6hWq78+axQrANwt/kVEl5j5h0G2IzMfUdWCtfa3R/VPzvhTAG8AOM/MfwwYehTANwB+ZOYPE4ODIDhJRJvMvD9IqLW2GEXRbSJ6AcBtZr6UGPzoS2Y+lc/nt+bm5v5Oa2CtvaKqywC8bs06M7+eGszMn7nTBqDOzPNpwcvLyyPb29vfAZh2Naq6Za0tpAbXarUzURS53eGKL1trv0oKZ+a3AHytqplMJlOOoui4tfaDvqOw1lZUtabubBOtqOqN0dHRB/v7++62XwHwDoB33dkAUGPmoO92e/yitXZeVT8BkE1acbdpPQiCj4hIBw52hQsLC8c6nc77AN4E8FK3yQ4R/Qzgc2b+Je0ZDPU+fjiZp1eXFD5U8CB7u+/DGybgXxnFMA3/m1GISGwegNMAeuYBuON53lKpVBrePBG5RkTuSPc1b2ZmZnDzRKRnHoDYvIODg3u5XM69/E8AKAO40G1aNcb0N6/ZbF5X1fsAbjpInXnGmETzGo3GRdew+0DPGmPSzRORTQA988bHx89NTk6mmtdoNGLziGjJ9/1085rN5l1VPWSeMSbVvLW1tXwYhoXp6en+5olIbB6A2Dzf9wcyb319/cju7m5hdnY22TwRic3zPO98qVQayLxWq3U0DMPYPGNMsnmrq6snx8bGNqempgYyT0SKzjoAsXnGmP7mNZvNU9lsdqtYLKaaJyJXABwyzxiTbp6IxOYRUd33/VTzNjY2RnZ2dnrmAdgyxqSbJyJnAMTmEdFl3/cTzROR2DzHk6qWiei4Maa/eSJScZY99FRXPM+7MTIy8iAMQ6/dbsfmEVHPPGPM4OaJiBtDqnmuqfuL4Pv+8Oa1Wq1jYRg+ZR6A2DxjzP/mPRupfwAf56Q4urCh6QAAAABJRU5ErkJggg==", "view/tab_panel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAABICAYAAADyMAW8AAAAcUlEQVRYR+3WsQ3AMAhE0TCMeyTvP1tShRQo7lxYegxA8fUPLuac97VhwuKXKhTlFxRQ9GPDClawYvGEDwxIZu7pFRZXr4ACinY1ghWsYMX/NxWQr22edyvGGHt6hcV1NqGAon8QVrCCFYteISDnBuQB3xJuQcDkEngAAAAASUVORK5CYII=", "view/btn_close.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAqCAYAAACz+XvQAAACmUlEQVRIS7WWS0/bUBCFz7mJmyZxENm06mNVoVZC7LqGn9FNqy55/BSWSEhs2/4uuqFVoA150JLKJvGdaiIH2TfXNoKQpeP5PHPO3GMTK/5xxTwsAUWkBeBZ+qAByb/Zh4pIA8CL9NqY5Dj7vw9YA/ABwDsAfwB8ITnUIhF5CuATgNcAfgH4RnJSCkwLl6AA/lXBtLZQQxFxoTr6q6LOFl2WmuJAtcY7ZuXIixsczfRyTlPfhpSN7BpwBeBtFdQLFJE2gI8AXi7GBBBl3Fdnv5L87XbpWxuFfQbw3NXM0dQLLdrDIH3ylGTiLLYB8CS9lpCc3tmU+xzL1Z9lEXl/n06KavjowCiK1uM4fqMd1Ov1s3a7fZntZjabtSeTiQYHgiC4aLVavZwpbofT6TQYDAaH1tod3bMwDHc7nc5PLZrNZmG/3z8WkS1jzGm32z1oNBqjUqD+6YM2m81xFWyeNkUaulAAlyKyWdTZbdqUmZKFakEVrLRDV7P5zY6m3rQp6tA1AMC5tXY7he51Op0fdwbGcdwdDodHWc2MMdcL9wGM1tbW9sMw/L6UNm6HChuNRifW2g1XM0dTL3TJZS1KkkTDFbVaLQqCIJcm6k0URRpxuvg39Xo9rtzDh5zt1Z/lXq+32rR5dKC1dt0YM08bAGd65BxN1ZB52ojIBcl82rgdWmsDkocAdgDoW22X5DxtSIZJkhyT3AJwCuCAZD5tfCP7oMaYcRVs/tAiDT1QHX2zqLPbtCkzxYFqjXfM3GKXAR3NtC6nqTccioAeA84BbCuU5B4Af9r4gCLSBXCU1UxErjPuj0Rk3xiznDYuMIWdANhwNXM09UKXXNai9LtQ9y4yxuS/XUijr9L0lXBDMp82j370HhJdWvsftiHJYFPSIqEAAAAASUVORK5CYII=", "comp/combobox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABCCAYAAAA476rKAAACfElEQVR4Xu3bMYsTURQF4PMmExgIWkgEU5hskyJYxGYKY5VS7NzCylL8Bftj3NbKQjuxTBWbaUwhKdIYLCJotlACA5m8kQTZZZkkeN9dbuNJOXPPu/DN5ZHkMa7dbpfgx0TAEdvEedeE2HbWxDa0JjaxLQUMe3HPJrahQECrNE3RarUOJheLBbIsq9znZAdgJ0mC4XCIer1eSa/Xa4xGI+R5TuwA272RTqeDfr9fuTeZTDCfz/dmONkK/cFggGazebnCcrnEeDw+uCKxFdiNRmO3nURRBO/9bvtYrVbEVpgejXa7XfR6PUynU8xms6O1nGzlU3DO7fbu7V5dlsf/0yO2ElsSJ7ZES1lLbCWgJE5siZaylthKQEmc2BItZS2xlYCSOLElWspaYisBJXFiS7SUtcRWAkrixJZoKWuJrQSUxIkt0VLWElsJKIkTW6L1t5an6wFooRGerofKBeZ4uh4IFxrj6XqoXECOp+sBaJoIT9c1esIsT9eFYFbl/J5tJc13agyliU1sWwHDbtyziW0oYNiKk22JfXJ6xnfXjcDdFttnb43a/b9tovQ5iG30/IltBL1tQ2xiGwoYtuJkE9tQILBV/ugl4rh2MF1sPJJP59fuc7IDsTe37mHz8Bki+MoKHhFqn9+j9vs7sQN9K7G89xRx837levHzG5Lph8p1TrZK3iF//ApxdLVI4YFk/BpA9Uc5sVXYwObOCfyDJ3AoUcIh+vIRtYuve1clthJ7G8/7p4hv30Xx6weSybuDKxL7BrARxcjTF0iyN4AviH0Tpto1ONlaQUGe2AIsbSmxtYKCPLEFWNpSYmsFBXliC7C0pZfY2oWY/zeBP8uaLni/AFTVAAAAAElFTkSuQmCC", "comp/textinput.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAWCAYAAACv8OArAAAAZElEQVRYR+3UQQkAMAwEwcZI/LtsoSL2NTGwMByZ3b3HJQIDO3H+EdidNezQGjbsUiBs+dmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4EwZdmwQ4Ew9QBe0R29X9x+dwAAAABJRU5ErkJggg==", "comp/vscroll.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAhCAYAAAA/F0BXAAAAOklEQVRIS2N8+OzVf2YWFgYmJiYGcgHjqCEYQTcaJpipaTRMRsOEmDJmNJ2MppPRdEJMCIymE2JCCQAYonwDuu2VMAAAAABJRU5ErkJggg==", "comp/vscroll$down.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAzCAYAAABxCePHAAAC/klEQVRIS+2WS0wTURSG/zszBcrLFVvjio0LiAqRRDAmGpRodFE1MQQQkOKGqBujRo3ExLjB4MaKgDzUaGQhvoJGYwAjYoioERcuDGxYEIwPkBY6nWvObXuLnXZaSklYOIu5M/fxzZn/nvPPsInJKa5qGhRFQaIH+w8xSbcymtTd+gBFYXAdyjM9sf7ORxgGR0t5/j9jpkhq2t5B0xQwBrgqNsnJ9V0j4BzQdQNtNYXWkKz0NDiaXkBTFTCFoaWmCHVtQ+AGh+4z0HNiO2bmPNYQGiXQvkuPoaqqiIgi8Pl8eHBqtwlA86MKS6Cy8z1gjIFzjqcXHBEBlpBgRNuOd+HVlYqogJiQIChcg/BtW5k8SaSSkxPJ5PRPTttHfkI7kcghIpn8NYfp33NLXp+TnYG1OWvA3ox9499nPSjdkCsgHJxOIjc43VMrugL9dEUD4Oj/PA4CsUfDX/jOjbmisHTDCCzi4t4QgLDrQF+qTYOmqhgYGw9BvLpv0ZNjQwieaU9b7ZCDriFhSt3VBSZNartHA6aUJ7SK+jqO5n5pSp1HiqSw1e3Di0ypwBpiU1XsudwnTanraDEqrg2GmZLbGkJh2jQVZY29JlPqPe03JX/uxLE7Nk3DjjP3pCn1Ne7HrNsjdYoLQsmWYtNQ3NCBgeZKzLrn/foEoogbQgvSUmz4454P7VQikGhpHzGSZdVOUqqYTGli6gemZ9yJ+0lSTalk/TrxtQOYaBnESbTinokev4UG+p+9/xoyJQKQn8x7vf7JjEFZ1FJBBvuC12RINIdAwtkIQuksnxgHhKBUZ6scQtLSNyiWJpav47z9STjbjfJ8k5iVN0eEs911bhZjUTWpbR+RztZ6uFBERNCq1rfS2e43lFhDsjPscDS9lM7W4dyCquuvpbM9PFkq0iHm7mSl2yP+bj05uxdeXZe5FHOL6Xdr17nQ79bziwew4NXFqwUTMiaEtKBPwtZjnRi8WgXPglfqsyQITc60pwpAeNpH1GRZtRM0pWVVcTJM6S+dYaRsIf025wAAAABJRU5ErkJggg==", "comp/vscroll$bar.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAA/CAYAAAAGyyO8AAABYElEQVRYR+2Wv0sDMRTH30tarCg6dRWnQnFT6OiqoP+tk+Cig+AiHayDiNSlg+jgD47K1US+Lwm5s4o/mkElN1xy73KfcF/efTi+Ht3Y0X1Btw8FffdoLy3QSnuZ+HhwZe+exrS13hGGJYsTWSszN0rJ1zHDDbJ0eDYkgHjv5Nxub3TIGEsTY/xDVq6NAN7MfW2u2aCG1nQ0GEZIOXmp7Pw5BPDF+VaGIGQfbM6k0ng5kw8/wF/eJzP5JInZkjg2CSS8zk6vCys7Wb8r5qqsncAP+pdR1Lu9rvgVT4uYg+3F+PCtAzjzu/taKdKKBSS2/wkEMBg/Q+rB50zqzZb7ZPoD/GeZ1HySxGxJHJsEEl5nc22VmCFalpFJTjLKNUtFxlDfP72IogYAP8PPZekWM5OqjErFWpjjbxprABJRA/JYjOOOX4Bgo6bWGYKsfMg5k+lmy5n8uUxm8kkSs6Vw7Cstibc9Fv5vWQAAAABJRU5ErkJggg==", "comp/vscroll$up.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAzCAYAAABxCePHAAADF0lEQVRIS92WTUhUURTHz31vPv0KKmkXrtxUGNomkCANLdCUpEatJFuIClIEFRl9kGH0BYWQElLpotGKEJXAtKQooYUFpi1axLQZMCyyZJqv926cM2/uTM288emoUHfx3v16v3fuuef+72Hume/c7/cBAwaLKWaLBZjLPc0Zk0CSJGBs4SDOObDP7i9ckuXkIbLJRJDFFrJk2SGNvZNwy7ExoZEJLWnqfQ+4SlUFaHNs0gXpQhq6x0GWGe0Y7oCicGivyYsLigup7XgFJlkCJjFwNm2HqrZR4CqHoKLC3fr8GFAMpPLqEJhMoZjpay6Bnx4vpKfYoLx1kCwKBlXoOV78BygGsudCH1nwtNVBgHBBUFFzL1n0+Gx5YghOxhINiAbFG1uZODESxf+bJShKrulv8HUusp1G/IBz1qTZIGvdamBjU584Aopzs+lbDhwfFFgc2/imLq0fazgAHF5MumBtuh3YwJsPfGdeNqgY1qqqfcSprRLgr7rWZzWbwCTL8HLKFYEEgkrUn+eHIDzNbltBSG33O+jcnxNZmrYcw5Yc7hoXotRenRPyz0IgBzrGYkTp9qEtxiEV10eEKD08Wgh7bzwTonSvIV/soK5jd53rE6I0eGY3/PL5wWYxQ+nFgShRKqK6LqTwhJNEafRKNQHCcWK3WmDHqR5NlMoSQzAWUV+9vkBMsKXYLCSbs3Oe+SGqqupGrIL3h3YclifYkjo7yZ7izIzUUGrhnvXAzA+PURkR8xCwPnMVsCUVpW0bsiCUKOH9S0980JvaLJSQUTal9Q+9/RgRJQSgnvgCgdBkxkCKektSpC9cR0HCOQgiZUMI3njijwYg+COzLP9rkLr7E3Dn4Gbhp7BPDC+n0TkhlK2zJpccuSBIfVdsutVdt9U4pLbjtVC2B0cKYN/N50LZHh0rFGGguztV14aFsvWfLiVhSrVboaSlXyjbk/NlBNKFVLT0k7INX3KAx+sXfkBlKzjpJItGLlcmhmSkptAB83h9MTuCICxBRUkMwUmY5+uFPY7LmJ7GW05SZycsSos9xUsmSr8BfgGeWI6+BgEAAAAASUVORK5CYII=", "comp/button.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABFCAYAAAAPWmvdAAABA0lEQVR4Xu3ZMRGDUBRFwXwfKSgxFhfRgAbUxEakkCEO3qmX+p9m5w7NW9v7cz18I4EFbeT1fwxtbgYtmEGDVgRC458GLQiExNKgBYGQWBq0IBASS4MWBEJiadCCQEgsDVoQCImlQQsCIbE0aEEgJJZW0Pbj64Q3hFvQhmL3CQ8atLlAKCwNWhAIiaVBCwIhsTRoQSAklgYtCITE0qAFgZBYGrQgEBJLgxYEQmJp0IJASCwNWhAIiaUVtOfrdMIbwi1oQ7H7hAcN2lwgFJYGLQiExNKgBYGQWBq0IBASS4MWBEJiadCCQEgsDVoQCImlQQsCIbE0aEEgJJYGLQiExNIC2g/MxaMp6CSauwAAAABJRU5ErkJggg==", "view/bg_tool.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAMklEQVRYR+3QQREAAAjDMCYG/DsEGXxSBb2ke7YeiwECBAgQIECAAAECBAgQIEDgW+AAAeIuAVS/mngAAAAASUVORK5CYII=", "comp/minBtn.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA8CAYAAAB1odqiAAAArUlEQVRYR+3X0QmAMAwE0GQN19B9nM193CmiIH7ZXOAoRc/fpjl8jVDdOj/eOc8USBcXqUjLAtDQRMSOdHb3JatTYCZUXodIy10bGxTI1Lx6/YA0Ima6W2tKFcjmdpGKtCow7NBAdxozy+804Gfx/cDqbLzWDzs0ekNY4B9nOMEehMKTVIEEyKeFSKmc18+MppRtipJuYPCa1SkwEyqvo6Tlxm8bFEijvBt9n/QA/fOPydLHcUIAAAAASUVORK5CYII=", "view/zoom_out.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAACy0lEQVRIS92WQU8TQRTH/28oQkj0CL0QOMAJQkz4DkS6A+GA+A00Hrhj0uy8NiTwEdBPAOrB0Fnq3U8g6gkOSjxUjpCQCu08M5u2qaVAt7YmOqfNZPa3b9/+Z35L6NOgPnHx98Gbm5sTlUplA0AGQBpACcBBKpXazmaz3+5607YVM/MjEXlNRPdbASJyTkRrzPz+Nvg1MDNPAvgI4AGA10qpvHPuSCk17ZwLAazV4HPM/PUmeDvwSwBPAbxl5sf+RmYWZo7XMvOehwPYYebnScAnAMaVUrNhGH5pBefz+Rnn3GcAJ8w8kQT8E8A9AEMA/HXrqM9fMrO/bjvataJvFdd7/IaZfS9/67ExZpeIngB4xczPklQ8KSKHPmoispdKpXKjo6PHp6enU5VKxXhoV6moVXhnjpVS5wDOwjD81K7qG7e033lXV1cviMjvvDEAP0TkYHBwcKtarT4UkXcALolo1RhTaIV3dVYYY9aIyOfZDw9fMcYUm+FdgWvtYgCmBisrpRbCMPxQh3cNbgM3zJzvCdhDcrncuojMA8gy8/eegTvO8U0Lk87/UY9ve9h/BI6iyJ+1GyLScB4RHQDYDoKgO+dFURSfFQCuOQ9A7LwgCJI5r1gsTlar1YbznHP5crl8NDw8PK2Uip3n4QMDA3OLi4udO89a23Ce1jp2nrVWtNbxh7bWxs4jop0gCDp3XhRFJyIy7pybXV5ejp3XDN7f359RSsXO01p37jxrbey8i4uLoZGRkWvOa5q/1Fp37rx+VtxwntY6dl5zK6Io2hWR2Hla686dV0vFoY+aP8xFJJdOp49LpdIUEZkaNHkqfIWd5JiIzkXkLAiCZM7zO09EYueJyBgRxc4joi0ADeeJyOrS0lJvnBdFkf8xbDhPKbWSyWR647xCocC+53XnAVjQWvfGeS1wo7XunfOstesA5pVS2Uwm8w877xeHf444cscwYAAAAABJRU5ErkJggg==", "view/refresh2.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA/CAYAAAAPIIPGAAAEIElEQVRYR+2XTUhjVxTH/+fGpBrGT/xoBQdFFMMQLNLNbLooLbaFzqKMUhCSZwsuhGG6KCNd6DuRLgqzmGVxUd8LUrpoYWZTKO1yNi2F1oVtceEHflSLqNEav8bklPuqgsl75sUPSsucTQj33v895+R/7y+XcA1B16CJ/6GoYRiDItKfzWZjExMTv5/XtoLlx2Kxm0qp1wH0AHgTwC4RfWRZ1mdewp6ig4ODN9Lp9CMieh+AchH41Lbtj92EXUUHBgaCh4eH3wJ4zSObGSLqtSzrZ9+ihmF8CODR8YIflFL3MplMNxF9IiJWIBC4Pz4+/ldR5RuG8QuAlwGsAWi3bTsVj8dvAWhOJpPfFPK2a/mGYewDeAHAV7Zt9+aK9PX1VYRCoVcApNxa4CX6J4B6AE9t2341V9QwjO8AvAFg27btytxxL9EvAbynJxNRj2VZX58sjMfjd4joyT9D9NiyrHf9iup+/gggBCALQPfxVwARAO8cWywD4LZt2z/5EtWT+vv774rIBIBSlx/mmT5dyWTyC9+WOpkYi8XalVIPRKQbwItEpHv9PRE9tCzrt6IsVcgyhcYLnv1CAkWXfxFBxzEXXXipq+8imz7P9CJdO3+N754y86A+vYFAIDY8PHw58DHzTQB54DNNs3jwMfONY6R4go+Z/YNvbGwsuLKyci74APQys3/wMfMZ8InIPaVUt4g44AuHw/eHhoaKAx8znwEfM6dGR0dviUizaZoXA59pmvtE5ICPmfPAx8wVABzwubXA1VLM7IBPRJ4mEok88DHzKfiY2R/4mPkUfCLSk0gkTsHHzHdE5Immnog8TiQS/sDHzK7gE5EIEZ2CTyl1e2RkxD/4TNO8S0Su4BORZ0qpftM0iwefaZrtAB4QkQM+AA74ADxk5ufgc78CfV99xdy61yMajUbfAvA5gJeKycZj7gqADygajf5xRYIn+6xoUbmCDM9I/LuidXV1qK2txdzcHPb39ZPAOwpmGgqFUFFRgerqauczm81iaWkJa2v64eLhU6+eKqXQ1NTkZOcWq6urWF5edh1zzZSI0NbWhvLyctdFBwcHmJ2dxe7urn/R+vp6J0sd6XQaCwsLqKysRGNjI9bX17G4uIhMRr8jiig/EokgHA7j6OgIU1NTjkBZWRl0f7e2tgo60LX8rq4u/UjC5uamU2ZuBAIBZ1O9mVsLXEU7OztRUlKCnZ0dTE9P54nqfmsnaNHJycm8cVfRlpYW1NTUOJN1pjrjk6iqqkJra6vzNZVKYWZmxp+oLq2jo8NpgQ7dx729PZSWlkKL6hARpwr9Q+aGp/m12Zubm6H9mhtacH5+HhsbG/4tdTJTZ9bQ0OD0LxgMOm7Y3t6GNv55R7XgMS3oH5cJ/y3Rq775V3X5bx8zSv8DuWzoa2vgb5tumbHGlerDAAAAAElFTkSuQmCC", "view/settings2.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAA/CAYAAAAPIIPGAAAD2ElEQVRYR+1Xz08bRxT+ZjAGYQoH4rS9IBJBQJEsUC8VKNdQtamUE0fLayqhKHeOaGbFkT8gFVLZtXzk1qqKSs4NUg8RXCIQVoOQ2jRFHHCwBRj2VW+zttY/14BXVaPOyR7NfPN9771536xACEOEgImPDHRhYaHv/Pz8kEMVjUbjq6urxVZhayo/lUo9chzndTabfWMYxkMAGx7QrG3bL5LJ5B0p5f1MJvNz7QENQdPp9LdE9CMAZrcHYAaoxJ8AvARwD8AtAI9t2/7JD9wQdH5+/q7jOLzx04DqeCelnFlbW/s9EJQXGIbxq8eQ//4mhPieiJjlEwBf8qQQYtOyLFZRNeqYJpPJWCQSeUBEzz3JrwqFwvT6+vo575ybm4vGYrFNAF8AICnlbKlU2sxms4Uych2oYRh5AJ9UFggxb1mW5aeSTqfTRLTmm3tv2/bAVUCfWpb1zA9qGAaHwD/XGjQU+WVGHU0Ug4ZSUjXFnwMwXVP8nP1RAPG2i5/Z+q9pKpWaFUL8wvNE9FUmk9m48jWtLWavofztNZTb124oN2neH1mTvmoo/pcfHDGtdZ9nLbw4rrW+nvGZpvlISvl6aWnpjWmaD4nINT4hxKxS6sXy8vIdx3HuK6XaMz6ttWt8QohDInKNTwjhJtWzlJdCiHtEdEtK+VgpFWx8Wuu7RMQbWxofEb0TQsxordszPq11Q+MjoidCCNf4AGxqrYONb2VlJVYsFh84jvPck/yKW5/W2jU+rXWUwdj4OBQcYzbCxcXF5sanlMoLIaqMTylVZXymaVYZHxG9N02zufE1AH2qlKoyPqUUh6AyFwgaivzyVehoorxkdL6k/MUPIEdE0/7i5zcUGx8Rxdsufmbrv6ZKqSrjM01z48rXtLbFeA3FNT4At6/dUIJ7V/MV/6HOn0gkvgbwA4DPbyLZ2/sWwHcikUj82SHAMqe3DMrv+I6Ofw9USonJyUlXzfb2NhzHaamsKdPBwUGcnp7i7OwMAwMDGBsbc4H29vaQz+fR09OD3t5eHB8f1x3QEJQBR0dHcXFx4QL39/dXbTw5OXEBI5EIcrlcHXBDUGYxPj6O7u7uljJLpRJ2d3ddNf7RVD6DlhkWCgUcHrof0YjH44jFYu5vnt/Z2QmWz0lhsHIMi8Wiu/HDF6T7mMDExAT6+vjR8iHGHA5/8uqYTk1Noaurq3L6/v4+jo6OqtgMDQ1hZGSkMnd5eYmtra3K/0DQg4ODivTyLg7B8PBw+6ChyC8f39FEMWgoJRVK8TPbjl/T2mruWEO5SYMNo/P/xaDfeB712U3YeXv/ALDwD+TbY8Dbd9BBAAAAAElFTkSuQmCC", "view/setting.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAACAklEQVQ4T5XUS4iOcRTH8c9xCeVeiiiXhSJRJFIusRO2lEtZKFlgY6GxZDUrk2TFwii22JJLlERRLKRQJmXBkHIb8+hM/2d6ememed93957n93v+55zf9/mHll9VVTNxopTPR8T3piTyT1VVs7AL9zEd+4roOn5gK25HxLfacAjL8A8TWw6ta28jorc2LMLhIu7Ds2Jah4XlRVci4mNUVTUDadiLFF/G5GL4iyOYjxsYMnQ1BDfxujk0VmJPecFAO4bV2Nk05Bqzz3Za6ut86JJDx2vN4Hbj3hjBbcOt4eCaQZXUj5daT4pGoNFimI1zpdYVEf2jsTQX+5MX5NaOFdFFJHzJ2bWI+FJv6SRWYACTWliqa68ioqc2LMWpwtJ7PCymzVhSWOqOiHeZdPachqNIcXdBJV/2B6cLa5cwZLjQYOkqnuNsOeEM1uJgE43xDBsaH9QQfJ21VNBoHfpBaWHLiKGLoeO1ZnAHkpcxgkvOeoeDa0FjTnNLEfF1PJamYkcR3YmIX6OxNA35Kb7BFKwvoqf4jeV4GRE/azQ2Yh4GMaGFpbr2OSKe1Ibse1MRJ84fimkxMqc0Pc55MrjsOYvZRoofNW6/vPUSwEQ+2+tPQ14h9fX4Ap+aQ2MB1pQTB9sx5K24qmnorKWCRvtDF0PHa+0suBaW0ry91O5mus3n/wHmQwUTIH+tVgAAAABJRU5ErkJggg==", "view/refresh.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAkCAYAAAC9itu8AAACiElEQVQ4T4WVS4iPYRTGf4/7/X6XcivXcktEUhTKQkqyYCOKjWyUhezFThbIlJ3LYrIRkoWGUhhhTMko4zJujYRpxgxHj9737/P3zfh239c57/uc5/zO+UQ3T0QsBRYCtZI+5jBVx0fEcGA6MA+YCXQCVyXddWwlISL6ARuARcXvhQPrJF3/nRARvYHtwLRuFLYCFyW15ITl6XTHvwIuJzlrgHrgiqSOiqSI2ANMAL4BxyW1R8RYYKSkp8Vb8w2HgD7AE0kXSozoD0wC2nPCAWAw0CyppiRhBzAD6MgJW4D5KdDFNeSkiJgFbEvONeYE698N2K0ArPsDMAZwguN+AmeKfZgLbAb6llj7A7gk6eFfnY6I0cDKpNc1tQFNwG1JvvFPp0sKXQ2sAGokveuJpVHAHGBJ4ul76vLNapbs9dYk6R8oU7driyztA2Z3w5L1n5LUnBPWptMd/xw4l+RscsHAeeNSZMloTAG+AIcltUXERPdB0qMylk4klu5LOlni2ABgqm3Oko4BQ4Fnko6WJOxPzlXg2wV4hv2czuOYhmsBsDf1rD7fYP0HkyyzZN0twHjACZmlI0WWFgM7e2DprKQ71SyNA9YDBnFYcq0RuOZ5/h9LdsVS6yV97YmlgYDn2X3wjUa7QdKLapY8015ePrWMJVtembhewLI0YWU4eZvck/Q525pXo4M/AY+TLMP40u+SuooseVjsitm/IakzItz5QcXhKSZsBCyrpdjlwuZwfSO8mLOkdYAHqFXSrRKWvErtXFdOcJcnp0AX96ZwuldQ5uxtTrD+VUmWWXqfujwk8eQ4f68rsuRG+d/gZVb9eIk9kPS6miXvIv91rNc12TXPc5MkTyO/AFhJCujHqZlCAAAAAElFTkSuQmCC", "comp/checkbox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAqCAYAAACDdWrxAAABbUlEQVRIS+2TP0gCURzHv88GRYsrExyOo5cEQVEtWdQQpE4N0R+HxmirXXCrKYigqMF2IRqCQByaLJqNIFpyUIzu4rIwpExODy88ITD/cJ603Rsf7/OGz+/zI5TSEAE20cZRgBMySKni8XrbwICrWAwG2ESZIadFS53J0R25brCyHZNud1vbcRuPV7fDAOu9GXJatNSZHN2R6wb/PfJCrxOZCR8Gbk6hWc6Xg8PrcgBETMIVPdIGSjYG/NoOSHcfkLqDK3qsBSRIrgRAuBF1quUPEUPhYGMwb2dhywrqQ3F0Dt++jSokJMBdhmDO52pB2WwFP7OK8rgH9os99IgppNf3QWwMFP4RNHKALrmoflIj53l6CaWpRcBkgiIkYHl6gDTrh5JJg57v/kJ1YOUixw7jfWELxMpAKUmAXAR7tg3LZ7am3IbjKDBOvPiDqkUmcoj+9H1d7k3nmHdweBubB70ON9wRzQH8pVVQb+Q/zZAEfpwDCU4AAAAASUVORK5CYII=", "comp/btn_close.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA8CAYAAAB1odqiAAAE6UlEQVRYR+3Y30+bVRgH8G/T0t/0Jy0USrIsC0E2GMKAVYcRpmSbEzIGZhqyxCxeceGVF3pjvJl/wYyJWZYY4hZBFnBuBBUW2ewYAxlsSMiyLKH8aEt/0vZtSxvM+562We15C6jlxr53zfO8z+ec5z2nOTmCk598tY19fAQs+Hlvz76QX1zpAwd+1NMNXzieU1QtFeKbvn4CXvqgC95wLKegRirC1e8GCPjh+53wMnRwedkG54aLG4yhSI/ycnPawHaKJ5M1MhGuXR8k4MX3OnjBx3NPcLX3DPfepSu3odfrYC4r5X7bVlbhcrnT4kdrjlA7xYLffj9EwJ6udnhCW9TEJ08XUgWTqE6n5XLdbk9G7MjhKmodrbwAfQPDBLxw7h1ecH3dDq/Xm1GYrZqceXIgGo0GJSXFvOCNmz8RsLv9NNyhKO+icTqc8Pl8acDLyWyr1Wo1DEYDbw2dXIz+4TsE7DzbBneQH2SruDZc8Pv9GSiLqVQq6Iv0WVe5TiHG4K1RAnaceguuYCTrCx63G4FAgAoqlUpodbqs7+sVEgyN/ELAs20t2Ajwgz6vF6FgMGtL5QoF1BoNL1qklODW6DgBT518gxcM+P1gQqFdLRqZXA6lSkVFWXDk198I2NZyAs7NMDXR7XRmYBKZjMuNMEzmljHQF46hUIrR8XsEbG228IJ+T/rGFkskkMoVHBgOBRGNRNI2vkpL/5YsODZhJeCbJ47D4WeoM4wyDLai5PsWiCUQJ2aXTN4pnswzqmS4e+8BAZstDbxg1qW3hyALTlinCPh6Uz1C0Rg2w/S/tz3UpaYWSgsgF4twf3IagvOXr297PR5YGuv+bd2s71sfzkCj1ULQe+3u9vraGlg0lw+LlZhMEIzUNu7vmYYFmz/9LJeTS9We+PIymaGl6wLizo2cokJDEawDNxLg+W7EHTkGjUWw/tBPwOMdnYg7nNQZep4/Q2B9jYspS0zQHjyUlrdTPJksNBrwYGiQgE3vtiNup4O2SSuOzk5y7z2ubYKyuBiaAwe5394XzxGw29Pi5iYLdeDCYgMmfxxOgKfPIG53UBNt049SBVNo4g864HRmxMz1x3hAIybv3CZg49ttiK/bqYneFRuCLldGYTY5OfPkQBR6PTRl6cfIVEtLivHw51ECNrS2Ir62zrtKfWtrCHo8acDLyWyrFVot1CYTbw2hqQRTY2MJsLk5K8hW8TkcCPp8GSiHqdVQG41ZtxUHTkwQ8NhrFsRXyUrke3wuF0L+TSooVxVCrc9+iBKWmvDodysB65saEFtZ5cX8Hi+YQDBrS2VKBVRa/jONqKwU05NTBKyrexWxlRUquOnfBBNidrVoZHIZClWF1DqisjLMzPxBwNraasRsdHDD6c7ApDIJVzTMRDJiRQb6EUNkLsPs7DwBa6qrELPZqCNzu/1pG1siEUOhkHK5wWAYkUg0La7T0U9tIrMZc/MLBKw+XImtZTrIMBFEouQkIBEXQJaYXXJ0O8WTeQXlZsw/XSRg1SsVvGDWpbuHIAsu/LlEwMrKCsQDAcQ93j2U2H2qUKuBUKnE4uISBF9f/Hj7wJwVhyordl/hH2Q+W1zCixoLOdNUj98Ei+byYbH5lnPkmJhL6O+18/c0/1m38/c0qVbm72nYVuTvadgu5O9pUtsif0+Tv6dhF8P/657mLz4NfQVdLmZiAAAAAElFTkSuQmCC", "comp/textarea.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAAAXCAYAAABkrDOOAAAA4klEQVRoQ+3ZvQrCMBiF4e9rU+sPOErRqxDRe/KG9Fp0EAc3VzuIg1ML4uDmlkaaquDenMUTyJoDD+8W3ZyKlaoshSeogHOy1m1euOmoI1EU+auqQUf/8XHnnBzLp3jsWdaVJEnEGEPsADXU2Ifro8Gej/uSpqnHruvmaVegqirZX+4N9mIy8Nh13XEct7vE18RaK7vzjdiIFoiNUH5vEJvYQAHgFMsmNlAAOMWyiQ0UAE6xbGIDBYBTLJvYQAHgFMsmNlAAOMWyiQ0UAE79lM2fmrDy358a/q6Hhf68ng175QueKdEXxUGVVwAAAABJRU5ErkJggg==", "view/re.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAACpklEQVRIS+WWPUgcQRiG3+8O70QEUwTB1EJgsTGdRRrhOMjOtEtSRbBIBMFKuCtkZleES2uRQoWQJggKKW7Of7GyTRvBLkVShhS73OXMfWGOU85Es7uXs0m2XeZh+OZ95xnCHX10R1ykBvu+P5fP59+VSqVvf9pUarBS6jWAR0Q0rbWOboP3BCaiOQAHAKTW+vtN8L8BW96W4zjPPM/78Ss8FlypVEYajYbHzALAJIAHALJdoDWl1Esi4m74rWBmpiAI5pk5AHAvJj0VrXU5Fmyhvu+/AfA8YRxfaa1LsWDf92eZeSMJlJnXtdYvEo1Ca30G4GEH/ImI1lqt1nE+nz9vNBrLnVTY39uO4zxNdHgrKytjzWbzs13FzKfDw8PFxcXF8HL3Nscd8BEAN3HcgiCYbLVaHyyIiGaUUm+7R9JzQZRSo0T0BUCGmRd831/tBttK53K5zXK5/DV1pZVSG0Q0C2BXa/0kySEmKojWeoiZD4hoKpvNTiwtLX1MC7+1IFrrQWZeJaJxx3EKN5186lF0LwiC4DEz31dKvU+z69i7Ig0stnm9wv4zsDGm7bxCodBf5xlj2s5j5mkpZf+c1wHPEdFBGIbS87z+OO8S3EnAVhRFvTnv8PBwpF6ve0QkiGiSmX9znuu66ZxXq9XmAcQ6j5krUspkzqvVaqmcJ4SId54xxl6ZiZwHYN113WTOq1arZ0R05TwAa5lM5rher5/ncrllAPYl1HZeFEXJnLe3tzd2cXHRdh6A04GBgWKxWLxyXlcqjqIochPHbWdn58p5AGaEENec13NB9vf3R5vNZtt5RLTguu4159lKA9gUQqR3njHGHpx9tOxKKfvnvGq1OmQrC2AKwIQQon/OOzk5GQzD0I5hPIqi/jvPGNN2npTyH3feTzoJOzgswwlqAAAAAElFTkSuQmCC", "view/search.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAqCAYAAABcOxDuAAABX0lEQVRIS+3VsUrEQBAG4H9HiDZiJQg+gJVaiKAoWClYXWeZ7D6CtbWFr5Ai2ayQxkLQRgsLGwtBUQsRC6sDCxHxEIvIZSRwxRGSu83pNUe23c0H+89kR2AISwzBxAiinuctCSH2AawD+AFwRkR7QRC85CO0ur5SaoOZzwGM54A3IlrJw1aolPIewEJJUY+01jvde31RKeUMgNceXdLSWk9VQl3XnSWiZhnKzF9RFE1WQrPDUsonAHNFsBDiJAzDRmXUdd1tIjoFMJaDW0KI1TAMH61RpdQ0Mx8z8zMzHxLRAYBlAG0Al2ma7hpjHqxbqgNeAJgHcKW1XutEMeE4Ttv3/axXC1dh9XPgbZqmW8aYd9t3ohCVUt4BWARwkyTJZhzHH7Zgdq4MvQbw7ThOw/f9zypgKVoVsS7UX+C+v+kgeI0Oklrvb0Yw03rwlZW8Hnz14OvqjXrw1e/pPyfwCww91CttlMG7AAAAAElFTkSuQmCC", "view/save.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAA1klEQVRIS+2VzQ3DIAyFwxwdoMMAA/VQ8ZByyEBhmA7QOVxxKLIaOcIoSZUfrlifHw/wM91Ky6zE7SZgANTaDEDhzYJ5odSMC7nA5U7+b4X2dVQr3ic4hHCTlMcY33xPZUUGcwBvdEJwjcfGGIQQ4rd2qenWA3hyAUuABwCP31NtN+i1v02qP4DicRybM885J2ceB/NCyUupfuLxBS4WbmKF9rNUv4p9gq21d0l5SunF91RWZDAH8EYnBNd4nDPPWitnXst0I6Leez+feVowEQ3e+wNk3ge7C/Qp3GfwkgAAAABJRU5ErkJggg==" };
Base64AtlasManager.base64 = new Base64Atlas(Base64AtlasManager.dataO);
