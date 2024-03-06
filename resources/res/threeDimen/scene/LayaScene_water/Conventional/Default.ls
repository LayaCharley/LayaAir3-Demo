{
  "version": "LAYASCENE3D:01",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "Default",
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
        "type": "Sprite3D",
        "props": {
          "name": "Wood",
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
            1,
            1,
            1
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "props": {
          "name": "Plane",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            33.731,
            19.5,
            -13.2227
          ],
          "rotation": [
            0,
            0,
            0,
            -1
          ],
          "scale": [
            6.578309,
            6.578307,
            6.578307
          ],
          "meshPath": "Library/unity default resources-Plane.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.WaterPrimaryMaterial",
              "path": "Assets/Wat.lmat"
            },
            {
              "type": "Laya.WaterPrimaryMaterial",
              "path": "Assets/Wat.lmat"
            }
          ]
        },
        "components": [
          {
            "type": "PhysicsCollider",
            "restitution": 0,
            "friction": 0.5,
            "rollingFriction": 0,
            "shapes": [
              {
                "type": "MeshColliderShape",
                "mesh": "Library/unity default resources-Plane.lm"
              }
            ],
            "isTrigger": false
          }
        ],
        "child": []
      },
      {
        "type": "Camera",
        "props": {
          "name": "Main Camera",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            58.6,
            60.2,
            -12.78625
          ],
          "rotation": [
            -0.3885499,
            0.5946459,
            0.3979832,
            0.5805469
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
            0.01960784
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Sprite3D",
        "props": {
          "name": "Metals",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            0,
            0
          ],
          "rotation": [
            -0.6893593,
            -0.3980641,
            0.1827675,
            -0.5769964
          ],
          "scale": [
            1,
            1,
            1
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "DirectionLight",
        "props": {
          "name": "Directional Light",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            3.99,
            6.69,
            6.91
          ],
          "rotation": [
            -0.3817473,
            0.5449169,
            0.7450673,
            0.04700299
          ],
          "scale": [
            1,
            1,
            1
          ],
          "intensity": 1.1,
          "lightmapBakedType": 0,
          "color": [
            1,
            0.9568627,
            0.8392157
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "props": {
          "name": "Cube",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0.9244003,
            9.32,
            10.23196
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
          ],
          "meshPath": "Library/unity default resources-Cube.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Resources/unity_builtin_extra.lmat"
            }
          ]
        },
        "components": [
          {
            "type": "PhysicsCollider",
            "restitution": 0,
            "friction": 0.5,
            "rollingFriction": 0,
            "shapes": [
              {
                "type": "BoxColliderShape",
                "center": [
                  0,
                  0,
                  0
                ],
                "size": [
                  1,
                  1,
                  1
                ]
              }
            ],
            "isTrigger": false
          }
        ],
        "child": []
      }
    ]
  }
}