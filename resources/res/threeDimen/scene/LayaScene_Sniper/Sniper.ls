{
  "version": "LAYASCENE3D:01",
  "data": {
    "type": "Scene3D",
    "props": {
      "name": "Sniper",
      "ambientColor": [
        0.6320754,
        0.6320754,
        0.6320754
      ],
      "reflectionIntensity": 1,
      "lightmaps": [],
      "enableFog": false,
      "fogStart": 30,
      "fogRange": 30,
      "fogColor": [
        0.7058823,
        0.780933,
        1
      ]
    },
    "child": [
      {
        "type": "DirectionLight",
        "props": {
          "isStatic": false,
          "name": "Directional light",
          "layer": 0,
          "position": [
            -0.5802861,
            6.42,
            0.5103188
          ],
          "rotation": [
            -0.06865217,
            0.5393365,
            0.7192827,
            -0.432476
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
            0.9040985,
            0.740566
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Camera",
        "props": {
          "isStatic": false,
          "name": "Camera",
          "layer": 0,
          "position": [
            0,
            2.12,
            3.26
          ],
          "rotation": [
            -0.1305262,
            0,
            0,
            0.9914449
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
            0,
            0,
            0,
            0
          ]
        },
        "components": [],
        "child": []
      },
      {
        "type": "Sprite3D",
        "props": {
          "isStatic": false,
          "name": "Skin",
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
        "components": [
          {
            "type": "Animator",
            "avatar": {
              "path": "Assets/role/model/Skin-Skin-SkinAvatar.lav",
              "linkSprites": {
                "Bip001 Spine": [
                  "Bip001 Spine"
                ],
                "Bip001 Neck": [
                  "Bip001 Neck"
                ]
              }
            },
            "layers": [
              {
                "name": "shang",
                "weight": 1,
                "blendingMode": 0,
                "states": [
                  {
                    "name": "attack_2",
                    "clipPath": "Assets/role/model/attack_2_s-attack_2.lani"
                  },
                  {
                    "name": "dead_2",
                    "clipPath": "Assets/role/model/dead_2_s-dead_2.lani"
                  },
                  {
                    "name": "idle_4",
                    "clipPath": "Assets/role/model/idle_4_s-idle_4.lani"
                  },
                  {
                    "name": "replace_2",
                    "clipPath": "Assets/role/model/replace_2_s-replace_2.lani"
                  },
                  {
                    "name": "stop",
                    "clipPath": "Assets/role/model/stop_s-stop.lani"
                  },
                  {
                    "name": "reload",
                    "clipPath": "Assets/role/model/reload_s-reload.lani"
                  },
                  {
                    "name": "run",
                    "clipPath": "Assets/role/model/run_s-run.lani"
                  },
                  {
                    "name": "replace",
                    "clipPath": "Assets/role/model/replace_s-replace.lani"
                  },
                  {
                    "name": "dead",
                    "clipPath": "Assets/role/model/dead_s-dead.lani"
                  },
                  {
                    "name": "run_2",
                    "clipPath": "Assets/role/model/run_2_s-run_2.lani"
                  },
                  {
                    "name": "idle_2",
                    "clipPath": "Assets/role/model/idle_2_s-idle_2.lani"
                  },
                  {
                    "name": "idle_3",
                    "clipPath": "Assets/role/model/idle_3_s-idle_3.lani"
                  },
                  {
                    "name": "attack",
                    "clipPath": "Assets/role/model/attack_s-attack.lani"
                  },
                  {
                    "name": "idle4",
                    "clipPath": "Assets/role/model/idle4_s-idle4.lani"
                  },
                  {
                    "name": "attack_1",
                    "clipPath": "Assets/role/model/attack_1_s-attack_1.lani"
                  }
                ]
              },
              {
                "name": "xia",
                "weight": 1,
                "blendingMode": 0,
                "states": [
                  {
                    "name": "attack_2",
                    "clipPath": "Assets/role/model/attack_2_x-attack_2.lani"
                  },
                  {
                    "name": "dead_2",
                    "clipPath": "Assets/role/model/dead_2_x-dead_2.lani"
                  },
                  {
                    "name": "replace_2",
                    "clipPath": "Assets/role/model/replace_2_x-replace_2.lani"
                  },
                  {
                    "name": "stop",
                    "clipPath": "Assets/role/model/stop_x-stop.lani"
                  },
                  {
                    "name": "idle_4",
                    "clipPath": "Assets/role/model/idle_4_x-idle_4.lani"
                  },
                  {
                    "name": "reload",
                    "clipPath": "Assets/role/model/reload_x-reload.lani"
                  },
                  {
                    "name": "run",
                    "clipPath": "Assets/role/model/run_x-run.lani"
                  },
                  {
                    "name": "replace",
                    "clipPath": "Assets/role/model/replace_x-replace.lani"
                  },
                  {
                    "name": "dead",
                    "clipPath": "Assets/role/model/dead_x-dead.lani"
                  },
                  {
                    "name": "idle_2",
                    "clipPath": "Assets/role/model/idle_2_x-idle_2.lani"
                  },
                  {
                    "name": "run_2",
                    "clipPath": "Assets/role/model/run_2_x-run_2.lani"
                  },
                  {
                    "name": "idle_3",
                    "clipPath": "Assets/role/model/idle_3_x-idle_3.lani"
                  },
                  {
                    "name": "attack",
                    "clipPath": "Assets/role/model/attack_x-attack.lani"
                  },
                  {
                    "name": "idle4",
                    "clipPath": "Assets/role/model/idle4_x-idle4.lani"
                  },
                  {
                    "name": "attack_1",
                    "clipPath": "Assets/role/model/attack_1_x-attack_1.lani"
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
            "type": "Sprite3D",
            "props": {
              "isStatic": false,
              "name": "Bip001 Spine",
              "layer": 0,
              "position": [
                0.001176372,
                1.182587,
                -0.05871783
              ],
              "rotation": [
                -0.5097335,
                -0.4900725,
                -0.5097334,
                -0.4900739
              ],
              "scale": [
                1,
                0.9999999,
                0.9999999
              ]
            },
            "components": [],
            "child": [
              {
                "type": "Sprite3D",
                "props": {
                  "isStatic": false,
                  "name": "Bip001 L Thigh",
                  "layer": 11,
                  "position": [
                    -0.1388078,
                    -0.01466248,
                    0.1083926
                  ],
                  "rotation": [
                    -0.01228927,
                    0.9999184,
                    0.00243587,
                    -0.002491295
                  ],
                  "scale": [
                    1,
                    1,
                    1
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
                          0.12,
                          0,
                          0
                        ],
                        "size": [
                          0.39,
                          0.22,
                          0.22
                        ]
                      }
                    ],
                    "isTrigger": false
                  }
                ],
                "child": [
                  {
                    "type": "Sprite3D",
                    "props": {
                      "isStatic": false,
                      "name": "Bip001 L Calf",
                      "layer": 11,
                      "position": [
                        0.4307083,
                        0,
                        -9.536743e-9
                      ],
                      "rotation": [
                        7.884153e-11,
                        -2.358335e-10,
                        0.03613328,
                        -0.999347
                      ],
                      "scale": [
                        0.9999999,
                        1,
                        1
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
                              0.27,
                              0.01,
                              0
                            ],
                            "size": [
                              0.68,
                              0.18,
                              0.19
                            ]
                          }
                        ],
                        "isTrigger": false
                      }
                    ],
                    "child": []
                  }
                ]
              },
              {
                "type": "Sprite3D",
                "props": {
                  "isStatic": false,
                  "name": "Bip001 R Thigh",
                  "layer": 11,
                  "position": [
                    -0.1388078,
                    -0.01466187,
                    -0.110745
                  ],
                  "rotation": [
                    -0.01228926,
                    0.9999185,
                    -0.002433102,
                    0.002491416
                  ],
                  "scale": [
                    1,
                    1,
                    1
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
                          0.12,
                          0,
                          0
                        ],
                        "size": [
                          0.39,
                          0.22,
                          0.22
                        ]
                      }
                    ],
                    "isTrigger": false
                  }
                ],
                "child": [
                  {
                    "type": "Sprite3D",
                    "props": {
                      "isStatic": false,
                      "name": "Bip001 R Calf",
                      "layer": 11,
                      "position": [
                        0.4307082,
                        0,
                        9.536743e-9
                      ],
                      "rotation": [
                        -3.406049e-10,
                        2.45298e-10,
                        0.03613329,
                        -0.999347
                      ],
                      "scale": [
                        0.9999999,
                        1,
                        1
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
                              0.27,
                              0.01,
                              0
                            ],
                            "size": [
                              0.68,
                              0.18,
                              0.19
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
            ]
          },
          {
            "type": "Sprite3D",
            "props": {
              "isStatic": false,
              "name": "Bip001 Neck",
              "layer": 0,
              "position": [
                -0.007174818,
                1.683685,
                -0.1215536
              ],
              "rotation": [
                -0.5676311,
                -0.4216565,
                -0.5676309,
                -0.4216583
              ],
              "scale": [
                1,
                1,
                0.9999998
              ]
            },
            "components": [],
            "child": [
              {
                "type": "Sprite3D",
                "props": {
                  "isStatic": false,
                  "name": "Head",
                  "layer": 11,
                  "position": [
                    0.06585388,
                    0.0009313202,
                    0.005945481
                  ],
                  "rotation": [
                    2.188304e-13,
                    -4.048704e-7,
                    0.1459735,
                    -0.9892885
                  ],
                  "scale": [
                    1,
                    1,
                    1
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
                        "type": "SphereColliderShape",
                        "center": [
                          0.1,
                          0.04,
                          0
                        ],
                        "radius": 0.13
                      }
                    ],
                    "isTrigger": false
                  }
                ],
                "child": []
              },
              {
                "type": "Sprite3D",
                "props": {
                  "isStatic": false,
                  "name": "Bip001 R Clavicle",
                  "layer": 11,
                  "position": [
                    -0.08400894,
                    0.04769726,
                    -0.07335314
                  ],
                  "rotation": [
                    -0.6883618,
                    0.1617331,
                    0.6998312,
                    0.1011771
                  ],
                  "scale": [
                    1,
                    1,
                    1
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
                          -0.09,
                          -0.04,
                          0.12
                        ],
                        "size": [
                          0.45,
                          0.35,
                          0.48
                        ]
                      }
                    ],
                    "isTrigger": false
                  }
                ],
                "child": []
              }
            ]
          },
          {
            "type": "SkinnedMeshSprite3D",
            "props": {
              "isStatic": false,
              "name": "Mesh_0009",
              "layer": 0,
              "position": [
                0.0001495375,
                0.07081939,
                -0.08940195
              ],
              "rotation": [
                0.7070798,
                0.006170593,
                -0.006170592,
                -0.7070798
              ],
              "scale": [
                1,
                1,
                1
              ],
              "rootBone": "Bip001 Pelvis",
              "boundBox": {
                "min": [
                  0.01543236,
                  -0.1722671,
                  -0.7122723
                ],
                "max": [
                  0.9513968,
                  0.2702216,
                  0.7169186
                ]
              },
              "boundSphere": {
                "center": [
                  0.4834146,
                  0.04897723,
                  0.002323121
                ],
                "radius": 0.8823849
              },
              "materials": [
                {
                  "type": "Laya.PBRSpecularMaterial",
                  "path": "Assets/Materials/07-Default.lmat"
                },
                {
                  "type": "Laya.PBRSpecularMaterial",
                  "path": "Assets/Materials/07-Default.lmat"
                }
              ],
              "meshPath": "Assets/role/model/Skin-Mesh_0009.lm"
            },
            "components": [],
            "child": []
          },
          {
            "type": "SkinnedMeshSprite3D",
            "props": {
              "isStatic": false,
              "name": "Mesh_0022",
              "layer": 0,
              "position": [
                0.0001495375,
                0.07081939,
                -0.08940195
              ],
              "rotation": [
                0.7071068,
                0,
                0,
                -0.7071067
              ],
              "scale": [
                1,
                1,
                1
              ],
              "rootBone": "Bip001",
              "boundBox": {
                "min": [
                  -0.2143708,
                  -0.2214668,
                  -1.038273
                ],
                "max": [
                  0.1464932,
                  0.2017834,
                  0.2386527
                ]
              },
              "boundSphere": {
                "center": [
                  -0.03393881,
                  -0.009841673,
                  -0.39981
                ],
                "radius": 0.6964018
              },
              "materials": [
                {
                  "type": "Laya.PBRSpecularMaterial",
                  "path": "Assets/Materials/08-Default.lmat"
                }
              ],
              "meshPath": "Assets/role/model/Skin-Mesh_0022.lm"
            },
            "components": [],
            "child": []
          }
        ]
      }
    ]
  }
}