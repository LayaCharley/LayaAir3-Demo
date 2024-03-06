{
  "version": "LAYASCENE3D:01",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "layaScene",
      "ambientColor": [
        0.212,
        0.227,
        0.259
      ],
      "lightmaps": [],
      "enableFog": false,
      "fogStart": 0,
      "fogRange": 300,
      "fogColor": [
        0.5,
        0.5,
        0.5
      ]
    },
    "child": [
      {
        "type": "Camera",
        "props": {
          "name": "Main Camera",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            1,
            -10
          ],
          "rotation": [
            0,
            1,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "clearFlag": 1,
          "orthographic": false,
          "fieldOfView": 60,
          "nearPlane": 0.3,
          "farPlane": 1000,
          "viewport": [
            0,
            0,
            1,
            1
          ],
          "clearColor": [
            0.1921569,
            0.3019608,
            0.4745098,
            0
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Sprite3D",
        "props": {
          "name": "dude",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0.18,
            0.5,
            -8.47
          ],
          "rotation": [
            0,
            0,
            0,
            -1
          ],
          "scale": [
            1,
            1,
            1
          ]
        },
        "components": [
          {
            "type": "Animator",
            "avatar": {
              "path": "Assets/dude/dude-dude-dudeAvatar.lav",
              "linkSprites": {}
            },
            "layers": [
              {
                "name": "Base Layer",
                "weight": 0,
                "blendingMode": 0,
                "states": [
                  {
                    "name": "Take 001",
                    "clipPath": "Assets/dude/dude-Take 001.lani"
                  }
                ]
              }
            ],
            "cullingMode": 0,
            "playOnWake": true
          }
        ],
        "child": [
          {
            "type": "SkinnedMeshSprite3D",
            "props": {
              "name": "him",
              "active": true,
              "isStatic": false,
              "layer": 0,
              "position": [
                0,
                0,
                0
              ],
              "rotation": [
                0,
                0,
                0,
                -1
              ],
              "scale": [
                0.01,
                0.01,
                0.01
              ],
              "rootBone": "Root",
              "boundBox": {
                "min": [
                  -28.70251,
                  -20.1811,
                  -43.31205
                ],
                "max": [
                  28.75009,
                  19.26761,
                  36.05674
                ]
              },
              "boundSphere": {
                "center": [
                  0.02379036,
                  -0.4567451,
                  -3.627659
                ],
                "radius": 52.81195
              },
              "materials": [
                {
                  "path": "Assets/dude/Materials/head.lmat"
                },
                {
                  "path": "Assets/dude/Materials/jacket.lmat"
                },
                {
                  "path": "Assets/dude/Materials/pants.lmat"
                },
                {
                  "path": "Assets/dude/Materials/upBodyC.lmat"
                },
                {
                  "path": "Assets/dude/Materials/upBodyC.lmat"
                }
              ],
              "meshPath": "Assets/dude/dude-him.lm"
            },
            "components": [],
            "child": []
          }
        ]
      },
      {
        "type": "DirectionLight",
        "props": {
          "name": "Directional Light",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            3,
            0
          ],
          "rotation": [
            0.1093816,
            0.8754261,
            0.4082179,
            -0.2345697
          ],
          "scale": [
            1,
            1,
            1
          ],
          "intensity": 1,
          "lightmapBakedType": 0,
          "color": [
            1,
            0.9568627,
            0.8392157
          ]
        },
        "components": [],
        "child": []
      }
    ]
  }
}