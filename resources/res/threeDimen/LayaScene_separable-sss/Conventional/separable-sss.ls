{
  "version": "LAYASCENE3D:02",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "separable-sss",
      "sky": {
        "material": {
          "type": "Laya.SkyBoxMaterial",
          "path": "Assets/SkyBox.lmat"
        },
        "mesh": "SkyBox"
      },
      "ambientColor": [
        1,
        1,
        1
      ],
      "reflectionDecodingFormat": 1,
      "reflection": "Assets/SeparableSubsurfaceScatter/Demo/separable-sssGIReflection.ltcb",
      "reflectionIntensity": 1,
      "ambientMode": 1,
      "ambientSphericalHarmonics": [
        0.5539048,
        0.5391201,
        -0.04824696,
        0.2201784,
        0.1124423,
        -0.02009623,
        -0.03578854,
        -0.02628458,
        -0.03741321,
        0.523993,
        0.5481622,
        -0.0202238,
        0.1717743,
        0.09131526,
        -0.002582297,
        -0.03754579,
        -0.01374776,
        -0.05265674,
        0.4706144,
        0.5257954,
        0.01189597,
        0.1125304,
        0.06174705,
        0.0184667,
        -0.03659545,
        -0.003134285,
        -0.06482965
      ],
      "ambientSphericalHarmonicsIntensity": 1.27,
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
        "instanceID": 0,
        "props": {
          "name": "Main Camera",
          "active": true,
          "isStatic": false,
          "layer": 0,
          "position": [
            0.109,
            0.38,
            2.044
          ],
          "rotation": [
            -0.04557582,
            0.01402489,
            0.001723354,
            0.998861
          ],
          "scale": [
            1,
            1,
            1
          ],
          "clearFlag": 1,
          "orthographic": false,
          "orthographicVerticalSize": 10,
          "fieldOfView": 20,
          "enableHDR": false,
          "nearPlane": 0.1,
          "farPlane": 100,
          "viewport": [
            0,
            0,
            1,
            1
          ],
          "clearColor": [
            1,
            0.6644307,
            0.6084906,
            0
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "DirectionLight",
        "instanceID": 1,
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
            0.7529921,
            -0.04555326,
            0.4837958,
            -0.4436998
          ],
          "scale": [
            1,
            1,
            1
          ],
          "intensity": 1,
          "lightmapBakedType": 0,
          "color": [
            0.5566038,
            0.5566038,
            0.5566038
          ]
        },
        "components": [],
        "child": []
      }
    ]
  }
}