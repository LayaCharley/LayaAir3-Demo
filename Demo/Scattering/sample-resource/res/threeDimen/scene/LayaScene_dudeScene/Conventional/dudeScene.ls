{"version":"LAYASCENE3D:02","data":{"type":"Scene3D","props":{"name":"dudeScene","sky":{"material":{"type":"Laya.SkyProceduralMaterial","path":"Assets/Materials/Skybox.lmat"},"mesh":"SkyDome"},"ambientColor":[0.3970588,0.3970588,0.3970588],"reflectionDecodingFormat":0,"reflection":"Assets/Scenes/dudeSceneGIReflection.ltcb.ls","reflectionIntensity":1,"ambientMode":0,"ambientSphericalHarmonicsIntensity":1,"lightmaps":[],"enableFog":true,"fogStart":1,"fogRange":2,"fogColor":[0.2642733,0.7206843,0.7647059]},"child":[{"type":"Camera","instanceID":0,"props":{"name":"Camera","active":true,"isStatic":false,"layer":0,"position":[0,0.81,-1.85],"rotation":[0,0.9890159,0.1478094,0],"scale":[1,1,1],"clearFlag":1,"orthographic":false,"orthographicVerticalSize":10,"fieldOfView":60,"enableHDR":false,"nearPlane":0.3,"farPlane":1000,"viewport":[0,0,1,1],"clearColor":[0.1921569,0.3019608,0.4745098,0]},"components":[],"child":[]},{"type":"DirectionLight","instanceID":1,"props":{"name":"Directional Light","active":true,"isStatic":false,"layer":0,"position":[-0.004191816,0.3383333,0.0225434],"rotation":[0.1093816,0.8754261,0.4082179,-0.2345697],"scale":[1,1,1],"intensity":1,"lightmapBakedType":1,"color":[1,1,1]},"components":[],"child":[]},{"type":"Sprite3D","instanceID":2,"props":{"name":"dude","active":true,"isStatic":false,"layer":0,"position":[0,0,-0.63],"rotation":[0,0,0,-1],"scale":[1,1,1]},"components":[{"type":"Animator","layers":[{"name":"Base Layer","weight":0,"blendingMode":0,"states":[{"name":"Take 001","speed":1,"clipPath":"Assets/dude/dude-Take 001.lani"}]}],"cullingMode":0,"playOnWake":true}],"child":[{"type":"SkinnedMeshSprite3D","instanceID":3,"props":{"name":"him","active":true,"isStatic":false,"layer":0,"position":[0,0,0],"rotation":[0,0,0,-1],"scale":[0.01,0.01,0.01],"rootBone":4,"boundBox":{"min":[-28.70251,-20.1811,-43.31205],"max":[28.75009,19.26761,36.05674]},"boundSphere":{"center":[0.02379036,-0.4567451,-3.627659],"radius":52.81195},"bones":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,4,48,49,50,51,52,53,54,55,56,57,58,59,60,61],"enableRender":true,"receiveShadows":true,"castShadow":true,"materials":[{"path":"Assets/Materials/character_anim_headM.lmat"},{"path":"Assets/Materials/character_anim_jacketM.lmat"},{"path":"Assets/Materials/character_anim_pantsM.lmat"},{"path":"Assets/Materials/character_anim_upBodyM.lmat"},{"path":"Assets/Materials/character_anim_eyeBallM.lmat"}],"meshPath":"Assets/dude/dude-him.lm"},"components":[],"child":[]},{"type":"Sprite3D","instanceID":4,"props":{"name":"Root","active":true,"isStatic":false,"layer":0,"position":[0.0003756338,0.3746099,0.02230549],"rotation":[0.5000004,0.4999997,0.4999997,-0.5000004],"scale":[0.01,0.01,0.01]},"components":[],"child":[{"type":"Sprite3D","instanceID":48,"props":{"name":"Pelvis","active":true,"isStatic":false,"layer":0,"position":[-0.5862113,-0.06803528,-0.06857681],"rotation":[-0.4598415,0.5545885,-0.4610628,-0.5180719],"scale":[1,0.9999999,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":16,"props":{"name":"Spine","active":true,"isStatic":false,"layer":0,"position":[3.786007,-0.003599882,0.000005364418],"rotation":[0.000002043143,6.547205e-7,0.04744021,-0.9988741],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":26,"props":{"name":"L_Thigh1","active":true,"isStatic":false,"layer":0,"position":[-3.769306,-0.3552377,3.495145],"rotation":[0.2699664,0.9504409,0.1378982,-0.06902429],"scale":[1,0.9999999,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":22,"props":{"name":"L_Knee2","active":true,"isStatic":false,"layer":0,"position":[18.25719,-6.12689e-7,0.000001202237],"rotation":[-0.01744382,-0.005254356,0.223358,-0.9745662],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":23,"props":{"name":"L_Ankle1","active":true,"isStatic":false,"layer":0,"position":[15.42801,-1.324247e-7,3.407733e-7],"rotation":[0.0370233,0.03895982,-0.01629161,-0.9984218],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":24,"props":{"name":"L_Ball","active":true,"isStatic":false,"layer":0,"position":[5.250222,6.27385,-7.130623e-7],"rotation":[-5.03604e-8,-1.7162e-8,-0.7911951,-0.6115638],"scale":[1,1,1]},"components":[],"child":[]}]}]}]},{"type":"Sprite3D","instanceID":27,"props":{"name":"R_Thigh","active":true,"isStatic":false,"layer":0,"position":[-3.769314,-0.3552186,-3.495146],"rotation":[-0.1820399,0.9807242,-0.06934746,0.01524533],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":19,"props":{"name":"R_Knee","active":true,"isStatic":false,"layer":0,"position":[18.2572,-0.000001206932,-0.000001281466],"rotation":[0.03352952,-0.001259473,0.09674703,-0.9947433],"scale":[0.9999999,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":20,"props":{"name":"R_Ankle","active":true,"isStatic":false,"layer":0,"position":[15.428,1.896547e-7,5.168786e-7],"rotation":[-0.03168427,-0.03351906,-0.2081026,-0.9770189],"scale":[0.9999998,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":21,"props":{"name":"R_Ball","active":true,"isStatic":false,"layer":0,"position":[5.250221,6.273849,-4.15015e-7],"rotation":[-5.589911e-9,-7.231804e-9,-0.7911951,-0.6115639],"scale":[1,1,0.9999999]},"components":[],"child":[]}]}]}]},{"type":"Sprite3D","instanceID":17,"props":{"name":"Spine1","active":true,"isStatic":false,"layer":0,"position":[4.543316,-0.003599524,-1.192093e-7],"rotation":[-0.03649483,0.01080884,0.05193984,-0.9979246],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":18,"props":{"name":"Spine2","active":true,"isStatic":false,"layer":0,"position":[4.544044,-0.003600121,4.768372e-7],"rotation":[-0.03633838,-0.01044707,-0.04157107,-0.9984199],"scale":[0.9999998,0.9999997,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":11,"props":{"name":"Spine3","active":true,"isStatic":false,"layer":0,"position":[4.543961,-0.004399538,2.384186e-7],"rotation":[-0.03705678,-0.007724587,-0.02270184,-0.9990254],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":7,"props":{"name":"Neck","active":true,"isStatic":false,"layer":0,"position":[5.536259,-0.002881885,1.192093e-7],"rotation":[0.06170842,-0.01210403,-0.2497541,-0.9662653],"scale":[0.9999999,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":5,"props":{"name":"Head","active":true,"isStatic":false,"layer":0,"position":[3.953899,0.000001907349,-1.192093e-7],"rotation":[0.01558622,-0.002385009,0.1521227,-0.9882358],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":9,"props":{"name":"L_eye_joint1","active":true,"isStatic":false,"layer":0,"position":[4.220684,1.406052,1.394846],"rotation":[-0.03907848,0.707075,-0.006703028,-0.7060261],"scale":[0.9999998,0.9999998,1]},"components":[],"child":[]},{"type":"Sprite3D","instanceID":10,"props":{"name":"L_eyeBall_joint2","active":true,"isStatic":false,"layer":0,"position":[4.482601,3.247939,1.274591],"rotation":[-0.04042507,-0.00001212308,-0.000299645,-0.9991825],"scale":[0.9999999,0.9999999,0.9999999]},"components":[],"child":[]},{"type":"Sprite3D","instanceID":6,"props":{"name":"R_eye_joint","active":true,"isStatic":false,"layer":0,"position":[4.296261,1.333192,-1.066092],"rotation":[-0.03907848,0.707075,-0.006703028,-0.7060261],"scale":[0.9999998,0.9999998,1]},"components":[],"child":[]},{"type":"Sprite3D","instanceID":14,"props":{"name":"R_eyeBall_joint","active":true,"isStatic":false,"layer":0,"position":[4.577007,3.107061,-1.207679],"rotation":[-0.01624862,-0.003852581,-0.01677767,-0.9997198],"scale":[0.9999999,0.9999998,0.9999998]},"components":[],"child":[]}]},{"type":"Sprite3D","instanceID":13,"props":{"name":"L_Clavicle","active":true,"isStatic":false,"layer":0,"position":[-0.3079605,-0.7705936,1.223297],"rotation":[0.6309623,-0.1328653,0.7479491,0.1574978],"scale":[0.9999999,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":15,"props":{"name":"L_UpperArm","active":true,"isStatic":false,"layer":0,"position":[6.704924,0.8875221,-0.1277451],"rotation":[0.09683058,-0.4674774,-0.3451324,-0.808067],"scale":[0.9999998,0.9999999,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":25,"props":{"name":"L_Forearm","active":true,"isStatic":false,"layer":0,"position":[13.14219,0.000003814697,0],"rotation":[-0.2943699,-0.1034228,0.1361366,-0.9402749],"scale":[0.9999999,0.9999998,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":32,"props":{"name":"L_Hand","active":true,"isStatic":false,"layer":0,"position":[10.82557,0,-0.000001907349],"rotation":[0.6023549,-0.05393243,-0.07413662,-0.7929462],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":35,"props":{"name":"L_Index1","active":true,"isStatic":false,"layer":0,"position":[4.348743,0.0162549,-1.561337],"rotation":[-0.1045436,-0.01058595,-0.03970221,-0.9936712],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":46,"props":{"name":"L_Index2","active":true,"isStatic":false,"layer":0,"position":[1.473694,9.018095e-8,5.823262e-7],"rotation":[-3.774008e-9,2.773379e-8,-0.1450583,-0.9894231],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":45,"props":{"name":"L_Index3","active":true,"isStatic":false,"layer":0,"position":[1.062845,1.397325e-7,0.000002218714],"rotation":[6.959475e-9,-6.694885e-9,5.596729e-10,-1],"scale":[0.9999998,0.9999999,0.9999999]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":36,"props":{"name":"L_Middle1","active":true,"isStatic":false,"layer":0,"position":[4.359985,-0.0002945374,-0.3668594],"rotation":[-0.01636031,-0.01003762,-0.1425034,-0.9896082],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":44,"props":{"name":"L_Middle2","active":true,"isStatic":false,"layer":0,"position":[1.529125,7.808657e-7,-3.643785e-7],"rotation":[4.952068e-9,-3.777052e-8,-0.1495136,-0.9887597],"scale":[0.9999999,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":43,"props":{"name":"L_Middle3","active":true,"isStatic":false,"layer":0,"position":[1.529127,7.279796e-7,6.759388e-7],"rotation":[-2.773966e-8,2.273515e-8,-0.03320855,-0.9994485],"scale":[1,1,1]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":38,"props":{"name":"L_Pinky1","active":true,"isStatic":false,"layer":0,"position":[3.972679,0.2234902,1.742834],"rotation":[0.1744637,0.04180707,-0.190304,-0.9651937],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":39,"props":{"name":"L_Pinky2","active":true,"isStatic":false,"layer":0,"position":[1.131794,-0.000002161949,-4.037946e-8],"rotation":[0,0,0,-1],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":37,"props":{"name":"L_Pinky3","active":true,"isStatic":false,"layer":0,"position":[0.8589554,6.749544e-7,5.439839e-7],"rotation":[2.396033e-8,-2.187278e-8,-0.03376852,-0.9994297],"scale":[0.9999999,1,1]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":41,"props":{"name":"L_Ring1","active":true,"isStatic":false,"layer":0,"position":[4.29501,-0.09474087,0.8064651],"rotation":[0.07488976,0.02598254,-0.1770824,-0.9809986],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":42,"props":{"name":"L_Ring2","active":true,"isStatic":false,"layer":0,"position":[1.403337,0.000001166872,-2.302475e-7],"rotation":[-1.884076e-8,-3.996202e-9,-0.2212597,-0.975215],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":40,"props":{"name":"L_Ring3","active":true,"isStatic":false,"layer":0,"position":[1.388264,2.131085e-7,-2.240952e-7],"rotation":[0,0,-0.078643,-0.9969029],"scale":[1,1,1]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":33,"props":{"name":"L_Thumb1","active":true,"isStatic":false,"layer":0,"position":[1.625107,0.6266322,-1.678762],"rotation":[-0.8008248,-0.2589474,0.1313026,-0.5238182],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":47,"props":{"name":"L_Thumb2","active":true,"isStatic":false,"layer":0,"position":[1.14043,0.000002859354,-0.000001814263],"rotation":[-2.453209e-8,-3.577175e-9,-0.1551712,-0.9878876],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":34,"props":{"name":"L_Thumb3","active":true,"isStatic":false,"layer":0,"position":[1.382469,-7.176536e-7,0.000003671683],"rotation":[6.429655e-8,3.388272e-8,-0.1351495,-0.9908252],"scale":[0.9999999,1,1]},"components":[],"child":[]}]}]}]}]}]}]},{"type":"Sprite3D","instanceID":8,"props":{"name":"R_Clavicle","active":true,"isStatic":false,"layer":0,"position":[-0.3079605,-0.7705898,-1.223302],"rotation":[-0.6309619,0.1328632,0.7479495,0.1574995],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":12,"props":{"name":"R_UpperArm","active":true,"isStatic":false,"layer":0,"position":[6.882456,-1.112103,0.03336836],"rotation":[-0.1604231,0.463096,0.2680637,-0.8294266],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":29,"props":{"name":"R_Forearm","active":true,"isStatic":false,"layer":0,"position":[13.14218,9.030945e-7,0.00000316086],"rotation":[0.2995481,0.08987944,0.4449129,-0.8391932],"scale":[0.9999998,0.9999998,0.9999997]},"components":[],"child":[{"type":"Sprite3D","instanceID":30,"props":{"name":"R_Hand","active":true,"isStatic":false,"layer":0,"position":[10.82555,4.455054e-7,-7.548039e-7],"rotation":[-0.5791631,-0.01074159,0.1888472,-0.7929637],"scale":[0.9999999,0.9999998,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":49,"props":{"name":"R_Index1","active":true,"isStatic":false,"layer":0,"position":[4.348743,0.01625061,1.561335],"rotation":[0.1037639,0.02822215,0.04036294,-0.9933818],"scale":[0.9999998,0.9999999,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":60,"props":{"name":"R_Index2","active":true,"isStatic":false,"layer":0,"position":[1.473696,-0.000003317978,3.016286e-7],"rotation":[-2.816184e-8,-2.255935e-8,-0.1590049,-0.9872778],"scale":[1,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":59,"props":{"name":"R_Index3","active":true,"isStatic":false,"layer":0,"position":[1.062846,-7.713862e-8,-3.799391e-7],"rotation":[-5.186984e-8,-1.64498e-8,-0.1150326,-0.9933617],"scale":[1,1,1]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":50,"props":{"name":"R_Middle1","active":true,"isStatic":false,"layer":0,"position":[4.359985,-0.0002935269,0.3668594],"rotation":[0.009663742,0.01891752,0.009482686,-0.9997294],"scale":[0.9999999,0.9999999,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":58,"props":{"name":"R_Middle2","active":true,"isStatic":false,"layer":0,"position":[1.529123,-0.000003339358,2.394216e-9],"rotation":[-3.267332e-8,2.143745e-8,-0.161319,-0.9869024],"scale":[1,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":57,"props":{"name":"R_Middle3","active":true,"isStatic":false,"layer":0,"position":[1.529126,-0.000001972138,-3.193875e-7],"rotation":[4.579039e-8,2.041403e-9,-0.03141069,-0.9995066],"scale":[0.9999999,0.9999999,0.9999999]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":52,"props":{"name":"R_Pinky1","active":true,"isStatic":false,"layer":0,"position":[3.972675,0.2234879,-1.742839],"rotation":[-0.1939404,-0.1003594,-0.1956548,-0.9560514],"scale":[0.9999999,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":53,"props":{"name":"R_Pinky2","active":true,"isStatic":false,"layer":0,"position":[1.131794,-0.000004572158,-2.546499e-7],"rotation":[-1.097598e-8,-2.382342e-9,-0.1896797,-0.981846],"scale":[1,0.9999999,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":51,"props":{"name":"R_Pinky3","active":true,"isStatic":false,"layer":0,"position":[0.8589554,-0.000002683744,3.0937e-7],"rotation":[0,0,-0.05023537,-0.9987374],"scale":[0.9999998,0.9999999,0.9999999]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":55,"props":{"name":"R_Ring1","active":true,"isStatic":false,"layer":0,"position":[4.295012,-0.09473419,-0.8064671],"rotation":[-0.07874372,-0.07450313,-0.08906556,-0.9901091],"scale":[1,0.9999999,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":56,"props":{"name":"R_Ring2","active":true,"isStatic":false,"layer":0,"position":[1.403336,0.000003562375,8.684979e-7],"rotation":[-2.49724e-9,1.344144e-8,-0.2358901,-0.9717798],"scale":[0.9999999,1,1]},"components":[],"child":[{"type":"Sprite3D","instanceID":54,"props":{"name":"R_Ring3","active":true,"isStatic":false,"layer":0,"position":[1.388262,-2.602473e-7,1.204491e-7],"rotation":[-1.506815e-8,-1.647666e-9,-0.1135932,-0.9935274],"scale":[0.9999999,0.9999999,0.9999999]},"components":[],"child":[]}]}]},{"type":"Sprite3D","instanceID":31,"props":{"name":"R_Thumb1","active":true,"isStatic":false,"layer":0,"position":[1.625105,0.6266289,1.67876],"rotation":[-0.7343466,-0.411229,-0.2316517,0.4878149],"scale":[0.9999999,0.9999997,0.9999998]},"components":[],"child":[{"type":"Sprite3D","instanceID":61,"props":{"name":"R_Thumb2","active":true,"isStatic":false,"layer":0,"position":[1.140432,-0.000001382952,7.557305e-7],"rotation":[-3.114816e-8,2.17736e-8,-0.2761612,-0.9611113],"scale":[0.9999999,1,0.9999999]},"components":[],"child":[{"type":"Sprite3D","instanceID":28,"props":{"name":"R_Thumb3","active":true,"isStatic":false,"layer":0,"position":[1.382469,3.763222e-8,-0.000003129955],"rotation":[6.491403e-8,-2.065605e-8,0.009796924,-0.999952],"scale":[1,1,1]},"components":[],"child":[]}]}]}]}]}]}]}]}]}]}]}]}]}]}]},{"type":"MeshSprite3D","instanceID":62,"props":{"name":"Plane","active":true,"isStatic":false,"layer":0,"position":[0,0,0],"rotation":[0,-1,0,0],"scale":[0.2,0.2,0.2],"meshPath":"Library/unity default resources-Plane.lm","enableRender":true,"receiveShadows":true,"castShadow":true,"materials":[{"path":"Assets/Materials/layabox.lmat"}]},"components":[{"type":"PhysicsCollider","restitution":0,"friction":0.5,"rollingFriction":0,"shapes":[{"type":"MeshColliderShape","mesh":"Library/unity default resources-Plane.lm"}],"isTrigger":false}],"child":[]},{"type":"MeshSprite3D","instanceID":63,"props":{"name":"Cube","active":true,"isStatic":false,"layer":0,"position":[0.4088883,0.067,0.726],"rotation":[0,0,0,-1],"scale":[0.1,0.1,0.1],"meshPath":"Library/unity default resources-Cube.lm","enableRender":true,"receiveShadows":true,"castShadow":true,"materials":[{"path":"Assets/Materials/layabox.lmat"}]},"components":[{"type":"PhysicsCollider","restitution":0,"friction":0.5,"rollingFriction":0,"shapes":[{"type":"BoxColliderShape","center":[0,0,0],"size":[1,1,1]}],"isTrigger":false}],"child":[]},{"type":"MeshSprite3D","instanceID":64,"props":{"name":"Sphere","active":true,"isStatic":false,"layer":0,"position":[0.5,0.05,-0.8],"rotation":[0,0,0,-1],"scale":[0.1,0.1,0.1],"meshPath":"Library/unity default resources-Sphere.lm","enableRender":true,"receiveShadows":true,"castShadow":true,"materials":[{"path":"Assets/Materials/layabox.lmat"}]},"components":[{"type":"PhysicsCollider","restitution":0,"friction":0.5,"rollingFriction":0,"shapes":[{"type":"SphereColliderShape","center":[0,0,0],"radius":0.5}],"isTrigger":false}],"child":[]},{"type":"MeshSprite3D","instanceID":65,"props":{"name":"Capsule","active":true,"isStatic":false,"layer":0,"position":[-0.622,0.107,0.547],"rotation":[0,0,0,-1],"scale":[0.1,0.1,0.1],"meshPath":"Library/unity default resources-Capsule.lm","enableRender":true,"receiveShadows":true,"castShadow":true,"materials":[{"path":"Assets/Materials/layabox.lmat"}]},"components":[{"type":"PhysicsCollider","restitution":0,"friction":0.5,"rollingFriction":0,"shapes":[{"type":"CapsuleColliderShape","center":[0,0,0],"radius":0.5,"height":2,"orientation":1}],"isTrigger":false}],"child":[]},{"type":"MeshSprite3D","instanceID":66,"props":{"name":"Cylinder","active":true,"isStatic":false,"layer":0,"position":[-0.5,0.1,-0.8],"rotation":[0,0,0,-1],"scale":[0.1,0.1,0.1],"meshPath":"Library/unity default resources-Cylinder.lm","enableRender":true,"receiveShadows":true,"castShadow":true,"materials":[{"path":"Assets/Materials/layabox.lmat"}]},"components":[{"type":"PhysicsCollider","restitution":0,"friction":0.5,"rollingFriction":0,"shapes":[{"type":"CapsuleColliderShape","center":[5.960464e-8,0,-8.940697e-8],"radius":0.5000001,"height":2,"orientation":1}],"isTrigger":false}],"child":[]}]}}