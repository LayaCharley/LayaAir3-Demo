{
  "_$ver": 1,
  "_$id": "e5mhma6b",
  "_$runtime": "res://ad3cf108-21a0-4a90-9e86-6a401327d722",
  "_$type": "Scene",
  "left": 0,
  "right": 0,
  "top": 0,
  "bottom": 0,
  "name": "Scene2D",
  "_$child": [
    {
      "_$id": "yhxok13l",
      "_$type": "Box",
      "name": "Box",
      "width": 1440,
      "height": 650,
      "left": 0,
      "right": 0,
      "top": 0,
      "bottom": 0,
      "bgColor": "#e8e8e8",
      "_$child": [
        {
          "_$id": "uzo97aq6",
          "_$type": "Image",
          "name": "logo",
          "x": 420,
          "y": 246,
          "width": 600,
          "height": 159,
          "centerX": 0,
          "centerY": 0,
          "skin": "resources/image/ly.png"
        },
        {
          "_$id": "pzugu9dg",
          "_$var": true,
          "_$type": "ProgressBar",
          "name": "loadingBar",
          "x": 500,
          "y": 476,
          "width": 440,
          "height": 20,
          "centerX": 0,
          "centerY": 161,
          "skin": "resources/image/progress.png",
          "sizeGrid": "0,0,0,0,1",
          "value": 0.014,
          "_$child": [
            {
              "_$id": "x5nyvggb",
              "_$type": "Text",
              "name": "Text",
              "x": 19.000000000000114,
              "y": 47.999999999999886,
              "width": 420,
              "height": 17,
              "text": "资源加载中……",
              "fontSize": 18,
              "color": "#030303",
              "align": "center",
              "leading": 0,
              "overflow": "visible"
            }
          ]
        }
      ]
    }
  ]
}