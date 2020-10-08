/**
 * 	管理关卡json 数据类，方便通过章节和索引取到关卡配置;
 *  
 */

class StageMng {
	public constructor() {

	}

	async init(){
		//异步加载关卡数据
		await RES.loadGroup("stage", 8).then(()=>{
			let items=RES.getGroupByName("stage");
			for(let item of items){
				let itemRes = RES.getRes(item.name);
				let key = StageMng.createKey(itemRes.chap,itemRes.index);
				this.stageMap[key]=itemRes;
			}
		});
	}

	private static stageMng = new StageMng();
	public static getInstance(): StageMng {
		return StageMng.stageMng;
	}

	public static createKey(chap,idx){
		return chap+","+idx;
	}
	//关卡映射
	stageMap: { [index: string]: Object } = {};

	//通过章节和索引取得json对象
	public getByChapAndIndex(chap: number, index: number): Object {
		let key =StageMng.createKey(chap,index);
		return this.stageMap[key];
	}
	//获得当前关卡对象
	public getCurrentStage():Object{
		let key =StageMng.createKey(PlayerMng.getInstance().chap,PlayerMng.getInstance().index);
		return this.stageMap[key];
	}

	public getNextStage():Object{
		return null;
	}

	public isLastStage():boolean{
		return false;
	}

}