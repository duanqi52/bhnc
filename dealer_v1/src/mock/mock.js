import Mock from 'mockjs'
// import nav from 'demo.json'

const Random = Mock.Random;


let menu = [];
for(let i = 0; i < 5;i++){
    let menuJson = {
        'Boolean':Random.boolean,
        'String':Random.string(2,10),
        'Range':Random.range(0,10,2),
        'Name':Random.name()
    };
    menu.push(menuJson)
}



Mock.mock('http://www.bai.com','post',menu)

