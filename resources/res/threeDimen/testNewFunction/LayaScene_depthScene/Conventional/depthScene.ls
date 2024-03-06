{
  "version": "LAYASCENE3D:02",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "depthScene",
      "ambientColor": [
        0.212,
        0.227,
        0.259
      ],
      "reflectionDecodingFormat": 0,
      "reflection": "Assets/depthshader/depthSceneGIReflection.ltcb",
      "reflectionIntensity": 1,
      "ambientMode": 1,
      "ambientSphericalHarmonics": [
        0.1148021,
        0.006147283,
        -0.01043589,
        0.000001465639,
        7.274211e-7,
        -0.001517453,
        0.01221374,
        -0.000009278157,
        0.01730475,
        0.1197678,
        0.03720374,
        -0.01835645,
        0.000003340416,
        0.000001599166,
        -0.003281836,
        0.01449029,
        -0.00001101097,
        0.0193983,
        0.1057567,
        0.06389047,
        -0.02477943,
        0.000005998222,
        0.000002952674,
        -0.006766447,
        0.0121782,
        -0.000008452363,
        0.01314808
      ],
      "ambientSphericalHarmonicsIntensity": 1,
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
        "type": "MeshSprite3D",
        "instanceID": 0,
        "props": {
          "name": "Plane",
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
            4.6466,
            4.6466,
            4.6466
          ],
          "meshPath": "Library/unity default resources-Plane.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/yellow.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Camera",
        "instanceID": 1,
        "props": {
          "name": "Camera",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            4.812133,
            3.902158,
            -5.126177
          ],
          "rotation": [
            0.09829108,
            -0.878413,
            -0.2055124,
            -0.420112
          ],
          "scale": [
            1,
            1,
            1
          ],
          "clearFlag": 0,
          "orthographic": false,
          "orthographicVerticalSize": 10,
          "fieldOfView": 60,
          "enableHDR": false,
          "nearPlane": 0.3,
          "farPlane": 1000,
          "viewport": [
            0,
            0,
            1,
            1
          ],
          "clearColor": [
            0.493948,
            0.8769369,
            0.9433962,
            0
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 2,
        "props": {
          "name": "Plane (1)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0,
            5,
            5
          ],
          "rotation": [
            0.7071068,
            0,
            0,
            -0.7071068
          ],
          "scale": [
            5.1721,
            5.1721,
            5.1721
          ],
          "meshPath": "Library/unity default resources-Plane.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/red.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 3,
        "props": {
          "name": "Plane (2)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -5,
            5,
            0
          ],
          "rotation": [
            0.5,
            0.5,
            0.5,
            -0.5
          ],
          "scale": [
            5.4077,
            5.4077,
            5.4077
          ],
          "meshPath": "Library/unity default resources-Plane.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/blue.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 4,
        "props": {
          "name": "Sphere (2)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            1.14,
            0.9,
            -1.69
          ],
          "rotation": [
            0,
            0,
            0,
            -1
          ],
          "scale": [
            1.5,
            1.5,
            1.5
          ],
          "meshPath": "Library/unity default resources-Sphere.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/blue.lmat"
            }
          ]
        },
        "components": [
          {
            "type": "Rigidbody3D",
            "mass": 1,
            "isKinematic": false,
            "restitution": 0,
            "friction": 0.5,
            "rollingFriction": 0,
            "linearDamping": 0,
            "angularDamping": 0,
            "overrideGravity": false,
            "gravity": [
              0,
              0,
              0
            ],
            "shapes": [],
            "isTrigger": false,
            "linearFactor": [
              1,
              1,
              1
            ],
            "angularFactor": [
              1,
              1,
              1
            ]
          },
          {
            "type": "Animator",
            "layers": [
              {
                "name": "Base Layer",
                "weight": 0,
                "blendingMode": 0,
                "states": [
                  {
                    "name": "sphereColor",
                    "clipPath": "Assets/depthshader/sphereColor-sphereColor.lani"
                  }
                ]
              }
            ],
            "cullingMode": 0,
            "playOnWake": true
          }
        ],
        "child": []
      },
      {
        "type": "SpotLight",
        "instanceID": 5,
        "props": {
          "name": "Spot Light",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -0.13,
            7.86,
            0.23
          ],
          "rotation": [
            0,
            0.7071068,
            0.7071068,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "intensity": 1,
          "lightmapBakedType": 0,
          "range": 10,
          "spotAngle": 53.2,
          "color": [
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
        "instanceID": 6,
        "props": {
          "name": "Cube",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            1.08,
            1.142519,
            0.38
          ],
          "rotation": [
            0,
            0,
            0,
            -1
          ],
          "scale": [
            1.5713,
            1.5713,
            1.5713
          ],
          "meshPath": "Library/unity default resources-Cube.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/red.lmat"
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
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 7,
        "props": {
          "name": "Sphere (1)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            1.08,
            2.764,
            0.38
          ],
          "rotation": [
            0,
            0,
            0,
            -1
          ],
          "scale": [
            1.5713,
            1.5713,
            1.5713
          ],
          "meshPath": "Library/unity default resources-Sphere.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/green.lmat"
            }
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "MeshSprite3D",
        "instanceID": 8,
        "props": {
          "name": "Cube (1)",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            -1.55,
            1.72,
            0.02
          ],
          "rotation": [
            0.09085091,
            0.03397338,
            -0.3486066,
            -0.9322367
          ],
          "scale": [
            1.5713,
            1.5713,
            1.5713
          ],
          "meshPath": "Library/unity default resources-Cube.lm",
          "enableRender": true,
          "materials": [
            {
              "type": "Laya.BlinnPhongMaterial",
              "path": "Assets/depthshader/origan.lmat"
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
          },
          {
            "type": "Animator",
            "layers": [
              {
                "name": "Base Layer",
                "weight": 0,
                "blendingMode": 0,
                "states": [
                  {
                    "name": "CubeRotate",
                    "clipPath": "Assets/depthshader/CubeRotate-CubeRotate.lani"
                  }
                ]
              }
            ],
            "cullingMode": 0,
            "playOnWake": true
          }
        ],
        "child": []
      }
    ]
  }
}