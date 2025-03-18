// 场景增强器 - 添加小动物和多样化植物
import { GAME_CONFIG } from './config.js';
import { renderer } from './renderer.js';

class SceneEnhancer {
    constructor(scene) {
        this.scene = scene;
        this.animals = [];
        this.plants = [];
        this.animalPool = [];
        this.plantPool = [];
        
        // 检测是否为移动设备
        this.isMobile = renderer ? renderer.isMobile : /Mobi|Android|iPhone/i.test(navigator.userAgent);
        
        // 配置
        this.config = {
            // 是否启用
            enabled: GAME_CONFIG.sceneEnhancer.enabled,
            
            // 小动物配置
            animals: {
                types: GAME_CONFIG.sceneEnhancer.animals.types,
                maxCount: this.isMobile ? 
                    GAME_CONFIG.sceneEnhancer.mobile.maxAnimals : 
                    GAME_CONFIG.sceneEnhancer.animals.maxCount,
                poolSize: GAME_CONFIG.sceneEnhancer.animals.poolSize,
                spawnDistance: GAME_CONFIG.sceneEnhancer.animals.spawnDistance,
                despawnDistance: GAME_CONFIG.sceneEnhancer.animals.despawnDistance,
                spawnProbability: this.isMobile ? 
                    GAME_CONFIG.sceneEnhancer.mobile.spawnProbability : 
                    GAME_CONFIG.sceneEnhancer.animals.spawnProbability,
                enabled: this.isMobile ? 
                    GAME_CONFIG.sceneEnhancer.mobile.animalsEnabled : 
                    true
            },
            
            // 植物配置
            plants: {
                types: GAME_CONFIG.sceneEnhancer.plants.types,
                maxCount: this.isMobile ? 
                    GAME_CONFIG.sceneEnhancer.mobile.maxPlants : 
                    GAME_CONFIG.sceneEnhancer.plants.maxCount,
                poolSize: GAME_CONFIG.sceneEnhancer.plants.poolSize,
                spawnDistance: GAME_CONFIG.sceneEnhancer.plants.spawnDistance,
                despawnDistance: GAME_CONFIG.sceneEnhancer.plants.despawnDistance,
                spawnProbability: this.isMobile ? 
                    GAME_CONFIG.sceneEnhancer.mobile.spawnProbability : 
                    GAME_CONFIG.sceneEnhancer.plants.spawnProbability,
                enabled: this.isMobile ? 
                    GAME_CONFIG.sceneEnhancer.mobile.plantsEnabled : 
                    true
            }
        };
        
        this.initialized = false;
        this.lastPerformanceCheck = 0;
        this.performanceCheckInterval = 5000; // 5秒检查一次性能
        this.fps = 60;
        this.lowPerformanceMode = false;
    }

    // 初始化
    init() {
        if (this.initialized || !this.config.enabled) return;
        
        console.log('初始化场景增强器...');
        console.log(`设备类型: ${this.isMobile ? '移动设备' : '桌面设备'}`);
        
        // 创建小动物对象池
        if (this.config.animals.enabled) {
            this.createAnimalPool();
        }
        
        // 创建植物对象池
        if (this.config.plants.enabled) {
            this.createPlantPool();
        }
        
        this.initialized = true;
        console.log('场景增强器初始化完成');
    }

    // 创建小动物对象池
    createAnimalPool() {
        console.log('创建小动物对象池...');
        
        // 创建小动物对象池
        for (let i = 0; i < this.config.animals.poolSize; i++) {
            // 随机选择小动物类型
            const typeIndex = Math.floor(Math.random() * this.config.animals.types.length);
            const type = this.config.animals.types[typeIndex];
            
            // 创建小动物对象
            const animal = this.createAnimal(type);
            
            // 添加到对象池
            this.animalPool.push(animal);
        }
        
        console.log(`小动物对象池创建完成，共 ${this.animalPool.length} 个对象`);
    }
    
    // 创建单个小动物对象
    createAnimal(type) {
        // 创建基本几何体
        let geometry, material, animal;
        
        switch (type) {
            case 'pigeon':
                // 鸽子 - 使用简单几何体组合
                animal = new THREE.Group();
                
                // 身体 - 椭球体
                geometry = new THREE.SphereGeometry(0.15, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
                const body = new THREE.Mesh(geometry, material);
                body.scale.set(1, 0.7, 1.5);
                animal.add(body);
                
                // 头部 - 小球体
                geometry = new THREE.SphereGeometry(0.08, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
                const head = new THREE.Mesh(geometry, material);
                head.position.set(0, 0.1, 0.2);
                animal.add(head);
                
                // 翅膀 - 扁平几何体
                geometry = new THREE.BoxGeometry(0.3, 0.05, 0.2);
                material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
                const wingLeft = new THREE.Mesh(geometry, material);
                wingLeft.position.set(-0.15, 0.05, 0);
                wingLeft.rotation.z = 0.2;
                animal.add(wingLeft);
                
                const wingRight = new THREE.Mesh(geometry, material);
                wingRight.position.set(0.15, 0.05, 0);
                wingRight.rotation.z = -0.2;
                animal.add(wingRight);
                
                // 设置动画参数
                animal.userData = {
                    type: 'pigeon',
                    height: 0.5 + Math.random() * 0.5, // 飞行高度
                    speed: 0.01 + Math.random() * 0.02,
                    amplitude: 0.1 + Math.random() * 0.1, // 上下振幅
                    frequency: 1 + Math.random() * 2,    // 振动频率
                    phase: Math.random() * Math.PI * 2   // 随机相位
                };
                break;
                
            case 'squirrel':
                // 松鼠 - 使用简单几何体组合
                animal = new THREE.Group();
                
                // 身体 - 椭球体
                geometry = new THREE.SphereGeometry(0.12, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
                const squirrelBody = new THREE.Mesh(geometry, material);
                squirrelBody.scale.set(1, 1, 1.2);
                animal.add(squirrelBody);
                
                // 头部 - 小球体
                geometry = new THREE.SphereGeometry(0.07, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
                const squirrelHead = new THREE.Mesh(geometry, material);
                squirrelHead.position.set(0, 0.05, 0.12);
                animal.add(squirrelHead);
                
                // 尾巴 - 弯曲的圆柱体
                geometry = new THREE.CylinderGeometry(0.01, 0.05, 0.2, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
                const tail = new THREE.Mesh(geometry, material);
                tail.position.set(0, 0.05, -0.15);
                tail.rotation.x = -Math.PI / 4;
                animal.add(tail);
                
                // 设置动画参数
                animal.userData = {
                    type: 'squirrel',
                    height: 0.05, // 地面高度
                    speed: 0.02 + Math.random() * 0.03,
                    amplitude: 0.05,
                    frequency: 2 + Math.random() * 3,
                    phase: Math.random() * Math.PI * 2
                };
                break;
                
            case 'rabbit':
                // 兔子 - 使用简单几何体组合
                animal = new THREE.Group();
                
                // 身体 - 椭球体
                geometry = new THREE.SphereGeometry(0.15, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xE0E0E0 });
                const rabbitBody = new THREE.Mesh(geometry, material);
                rabbitBody.scale.set(1, 1.2, 1);
                animal.add(rabbitBody);
                
                // 头部 - 球体
                geometry = new THREE.SphereGeometry(0.1, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xE0E0E0 });
                const rabbitHead = new THREE.Mesh(geometry, material);
                rabbitHead.position.set(0, 0.15, 0.1);
                animal.add(rabbitHead);
                
                // 耳朵 - 两个细长的圆柱体
                geometry = new THREE.CylinderGeometry(0.02, 0.01, 0.2, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xE0E0E0 });
                const earLeft = new THREE.Mesh(geometry, material);
                earLeft.position.set(-0.05, 0.3, 0.1);
                earLeft.rotation.x = -0.2;
                animal.add(earLeft);
                
                const earRight = new THREE.Mesh(geometry, material);
                earRight.position.set(0.05, 0.3, 0.1);
                earRight.rotation.x = -0.2;
                animal.add(earRight);
                
                // 设置动画参数
                animal.userData = {
                    type: 'rabbit',
                    height: 0.05, // 地面高度
                    speed: 0.03 + Math.random() * 0.02,
                    amplitude: 0.15 + Math.random() * 0.1, // 跳跃高度
                    frequency: 1 + Math.random() * 1.5,    // 跳跃频率
                    phase: Math.random() * Math.PI * 2
                };
                break;
        }
        
        // 设置初始位置和可见性
        animal.position.set(0, 0, 0);
        animal.visible = false;
        
        // 添加到场景
        this.scene.add(animal);
        
        return animal;
    }

    // 创建植物对象池
    createPlantPool() {
        console.log('创建植物对象池...');
        
        // 创建植物对象池
        for (let i = 0; i < this.config.plants.poolSize; i++) {
            // 随机选择植物类型
            const typeIndex = Math.floor(Math.random() * this.config.plants.types.length);
            const type = this.config.plants.types[typeIndex];
            
            // 创建植物对象
            const plant = this.createPlant(type);
            
            // 添加到对象池
            this.plantPool.push(plant);
        }
        
        console.log(`植物对象池创建完成，共 ${this.plantPool.length} 个对象`);
    }
    
    // 创建单个植物对象
    createPlant(type) {
        // 创建基本几何体
        let geometry, material, plant;
        
        switch (type) {
            case 'bush':
                // 灌木 - 使用多个球体组合
                plant = new THREE.Group();
                
                // 灌木主体 - 多个重叠的球体
                const bushSize = 0.3 + Math.random() * 0.3;
                const bushColor = 0x2E8B57; // 深绿色
                
                for (let i = 0; i < 5; i++) {
                    geometry = new THREE.SphereGeometry(bushSize * (0.7 + Math.random() * 0.3), 8, 8);
                    material = new THREE.MeshLambertMaterial({ 
                        color: bushColor,
                        flatShading: true
                    });
                    const bushPart = new THREE.Mesh(geometry, material);
                    bushPart.position.set(
                        (Math.random() - 0.5) * bushSize,
                        Math.random() * bushSize * 0.5,
                        (Math.random() - 0.5) * bushSize
                    );
                    plant.add(bushPart);
                }
                
                // 设置植物参数
                plant.userData = {
                    type: 'bush',
                    swayAmplitude: 0.01,
                    swayFrequency: 0.5 + Math.random() * 0.5,
                    swayPhase: Math.random() * Math.PI * 2
                };
                break;
                
            case 'flower':
                // 花 - 使用圆柱体和圆盘
                plant = new THREE.Group();
                
                // 茎 - 细长的圆柱体
                geometry = new THREE.CylinderGeometry(0.01, 0.01, 0.3, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x228B22 });
                const stem = new THREE.Mesh(geometry, material);
                stem.position.y = 0.15;
                plant.add(stem);
                
                // 花朵 - 圆盘
                const flowerColors = [0xFF69B4, 0xFFFF00, 0xFF6347, 0x9370DB, 0x00BFFF];
                const flowerColor = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                
                geometry = new THREE.CircleGeometry(0.05 + Math.random() * 0.03, 8);
                material = new THREE.MeshLambertMaterial({ 
                    color: flowerColor,
                    side: THREE.DoubleSide
                });
                const flower = new THREE.Mesh(geometry, material);
                flower.position.y = 0.3;
                flower.rotation.x = -Math.PI / 2;
                plant.add(flower);
                
                // 花蕊 - 小球体
                geometry = new THREE.SphereGeometry(0.02, 8, 8);
                material = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
                const center = new THREE.Mesh(geometry, material);
                center.position.y = 0.31;
                plant.add(center);
                
                // 设置植物参数
                plant.userData = {
                    type: 'flower',
                    swayAmplitude: 0.1 + Math.random() * 0.1,
                    swayFrequency: 1 + Math.random() * 1,
                    swayPhase: Math.random() * Math.PI * 2
                };
                break;
                
            case 'grass':
                // 草 - 使用多个平面
                plant = new THREE.Group();
                
                // 草叶 - 多个平面
                const grassCount = 3 + Math.floor(Math.random() * 4);
                const grassHeight = 0.15 + Math.random() * 0.15;
                const grassColor = 0x7CFC00; // 亮绿色
                
                for (let i = 0; i < grassCount; i++) {
                    geometry = new THREE.PlaneGeometry(0.03 + Math.random() * 0.02, grassHeight);
                    material = new THREE.MeshLambertMaterial({ 
                        color: grassColor,
                        side: THREE.DoubleSide
                    });
                    const grassBlade = new THREE.Mesh(geometry, material);
                    grassBlade.position.set(
                        (Math.random() - 0.5) * 0.1,
                        grassHeight / 2,
                        (Math.random() - 0.5) * 0.1
                    );
                    grassBlade.rotation.y = Math.random() * Math.PI;
                    grassBlade.rotation.x = (Math.random() - 0.5) * 0.2;
                    plant.add(grassBlade);
                }
                
                // 设置植物参数
                plant.userData = {
                    type: 'grass',
                    swayAmplitude: 0.15 + Math.random() * 0.15,
                    swayFrequency: 1.5 + Math.random() * 1.5,
                    swayPhase: Math.random() * Math.PI * 2
                };
                break;
        }
        
        // 设置初始位置和可见性
        plant.position.set(0, 0, 0);
        plant.visible = false;
        
        console.log(`创建植物对象 ${type}，ID: ${plant.id}`);
        // 添加到场景
        this.scene.add(plant);
        
        return plant;
    }

    // 更新场景增强元素
    update(cameraPosition) {
        if (!this.initialized || !this.config.enabled) return;
        
        // 性能检查
        this.checkPerformance();
        
        // 如果处于低性能模式，减少更新频率
        if (this.lowPerformanceMode && Math.random() > 0.3) {
            return;
        }
        
        // 更新小动物
        if (this.config.animals.enabled) {
            this.updateAnimals(cameraPosition);
        }
        
        // 更新植物
        if (this.config.plants.enabled) {
            this.updatePlants(cameraPosition);
        }
    }

    // 性能检查
    checkPerformance() {
        const now = performance.now();
        
        // 每隔一段时间检查一次性能
        if (now - this.lastPerformanceCheck < this.performanceCheckInterval) {
            return;
        }
        
        this.lastPerformanceCheck = now;
        
        // 获取当前FPS
        if (window.gameState && window.gameState.getState) {
            this.fps = window.gameState.getState().fps || 60;
        }
        
        // 根据FPS调整性能模式
        if (this.fps < 30) {
            if (!this.lowPerformanceMode) {
                console.log('场景增强器：检测到低FPS，启用低性能模式');
                this.lowPerformanceMode = true;
                
                // 减少活跃的小动物和植物数量
                this.reduceActiveElements();
            }
        } else if (this.fps > 45) {
            if (this.lowPerformanceMode) {
                console.log('场景增强器：FPS恢复正常，关闭低性能模式');
                this.lowPerformanceMode = false;
            }
        }
    }
    
    // 减少活跃的小动物和植物数量
    reduceActiveElements() {
        // 移除一半的小动物
        const animalsToRemove = Math.floor(this.animals.length / 2);
        for (let i = 0; i < animalsToRemove && this.animals.length > 0; i++) {
            const animal = this.animals.pop();
            animal.visible = false;
            this.animalPool.push(animal);
        }
        
        // 移除一半的植物
        const plantsToRemove = Math.floor(this.plants.length / 2);
        for (let i = 0; i < plantsToRemove && this.plants.length > 0; i++) {
            const plant = this.plants.pop();
            plant.visible = false;
            this.plantPool.push(plant);
        }
    }

    // 更新小动物
    updateAnimals(cameraPosition) {
        // 移除远离摄像机的小动物
        this.animals = this.animals.filter(animal => {
            const distanceToCamera = animal.position.distanceTo(cameraPosition);
            if (distanceToCamera > this.config.animals.despawnDistance) {
                animal.visible = false;
                this.animalPool.push(animal);
                return false;
            }
            return true;
        });
        
        // 如果小动物数量少于最大值，且有概率生成新的小动物
        if (this.animals.length < this.config.animals.maxCount && 
            Math.random() < this.config.animals.spawnProbability && 
            this.animalPool.length > 0) {
            
            // 从对象池中取出一个小动物
            const animal = this.animalPool.pop();
            
            // 设置位置 - 在摄像机前方随机位置
            const angle = Math.random() * Math.PI * 2;
            const distance = this.config.animals.spawnDistance * 0.7 + Math.random() * this.config.animals.spawnDistance * 0.3;
            const x = cameraPosition.x + Math.cos(angle) * distance;
            const z = cameraPosition.z + Math.sin(angle) * distance + distance * 0.5; // 确保在前方
            
            // 设置高度
            const y = animal.userData.height || 0.1;
            
            animal.position.set(x, y, z);
            animal.rotation.y = Math.random() * Math.PI * 2;
            animal.visible = true;
            
            // 添加到活动小动物列表
            this.animals.push(animal);
        }
        
        // 动画更新
        const time = performance.now() * 0.001;
        this.animals.forEach(animal => {
            const { type, speed, amplitude, frequency, phase } = animal.userData;
            
            // 根据类型应用不同的动画
            switch (type) {
                case 'pigeon':
                    // 鸽子飞行动画
                    animal.position.y = animal.userData.height + Math.sin(time * frequency + phase) * amplitude;
                    animal.rotation.z = Math.sin(time * frequency * 2 + phase) * 0.1;
                    break;
                    
                case 'squirrel':
                    // 松鼠跑动动画
                    animal.position.x += Math.sin(time * frequency + phase) * speed;
                    animal.position.z += Math.cos(time * frequency + phase) * speed;
                    animal.rotation.y = Math.atan2(
                        Math.cos(time * frequency + phase),
                        Math.sin(time * frequency + phase)
                    );
                    break;
                    
                case 'rabbit':
                    // 兔子跳跃动画
                    animal.position.y = animal.userData.height + Math.abs(Math.sin(time * frequency + phase)) * amplitude;
                    animal.position.x += Math.sin(time * frequency * 0.5 + phase) * speed * 0.2;
                    animal.position.z += Math.cos(time * frequency * 0.5 + phase) * speed * 0.2;
                    animal.rotation.y = Math.atan2(
                        Math.cos(time * frequency * 0.5 + phase),
                        Math.sin(time * frequency * 0.5 + phase)
                    );
                    break;
            }
        });
    }

    // 更新植物
    updatePlants(cameraPosition) {
        // 移除远离摄像机的植物
        this.plants = this.plants.filter(plant => {
            const distanceToCamera = plant.position.distanceTo(cameraPosition);
            if (distanceToCamera > this.config.plants.despawnDistance) {
                plant.visible = false;
                this.plantPool.push(plant);
                return false;
            }
            return true;
        });
        
        // 如果植物数量少于最大值，且有概率生成新的植物
        if (this.plants.length < this.config.plants.maxCount && 
            Math.random() < this.config.plants.spawnProbability && 
            this.plantPool.length > 0) {
            
            // 从对象池中取出一个植物
            const plant = this.plantPool.pop();
            
            // 设置位置 - 在摄像机前方随机位置
            const angle = Math.random() * Math.PI * 2;
            const distance = this.config.plants.spawnDistance * 0.7 + Math.random() * this.config.plants.spawnDistance * 0.3;
            const x = cameraPosition.x + Math.cos(angle) * distance;
            const z = cameraPosition.z + Math.sin(angle) * distance + distance * 0.5; // 确保在前方
            
            plant.position.set(x, 0, z);
            plant.rotation.y = Math.random() * Math.PI * 2;
            plant.visible = true;
            
            // 添加到活动植物列表
            this.plants.push(plant);
        }
        
        // 植物动画更新（摇摆效果）
        const time = performance.now() * 0.001;
        this.plants.forEach(plant => {
            if (plant.userData.type === 'flower' || plant.userData.type === 'grass') {
                const { swayAmplitude, swayFrequency, swayPhase } = plant.userData;
                if (swayAmplitude && swayFrequency) {
                    plant.rotation.x = Math.sin(time * swayFrequency + swayPhase) * swayAmplitude;
                    plant.rotation.z = Math.cos(time * swayFrequency + swayPhase) * swayAmplitude;
                }
            }
        });
    }
}

export const sceneEnhancer = new SceneEnhancer();
