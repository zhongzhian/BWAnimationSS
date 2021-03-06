// 聚光灯游戏
import Stage = Laya.Stage;
import WebGL   = Laya.WebGL;
import Sprite = Laya.Sprite;
class SpotlightShowPicture {
    public static spotlightShowPictureMain: SpotlightShowPictureMain; // 主界面
    constructor()
    {
        // 初始化舞台设置
		Laya.init(1024, 768, WebGL);
		Laya.stage.alignV = Stage.ALIGN_MIDDLE;
		Laya.stage.alignH = Stage.ALIGN_CENTER;
		Laya.stage.scaleMode = "showall";
		Laya.stage.bgColor = "#FFFFFF";
        
        // 加载游戏资源
        let resArray: any[] = [
            {url: "res/atlas/common.atlas", type: Laya.Loader.ATLAS},
            {url: "res/atlas/SpotlightShowPicture.atlas", type: Laya.Loader.ATLAS},
            // {url: "template/Text/TextBox.png", type: Laya.Loader.IMAGE},
            // {url: "template/ButtonTab/btn_LargeTabButton_Middle.png", type: Laya.Loader.IMAGE}
        ];
        
        Laya.loader.load(resArray, Laya.Handler.create(this, this.onload));     
    }

    // 游戏资源加载完成进行游戏初始化设置
    private onload() {
        let text = new Laya.Text();
        text.text = "fffff";
        text.font = "ff";
        Laya.SoundManager.playSound("res/audio/spotlight-bg.wav", 0);
        // ff字体加载完再加载主页面
        Laya.timer.once(100, this, function() {
            SpotlightShowPicture.spotlightShowPictureMain = new SpotlightShowPictureMain();
            SpotlightShowPicture.spotlightShowPictureMain.replayBtn.on(Laya.Event.CLICK, this, this.restart);
            Laya.stage.addChild(SpotlightShowPicture.spotlightShowPictureMain);
            SpotlightShowPicture.spotlightShowPictureMain.on(Laya.Event.CLICK, this, this.start);
            
        });
    }

    // 游戏开始
    private start() {
        SpotlightShowPicture.spotlightShowPictureMain.off(Laya.Event.CLICK, this, this.start);
        SpotlightShowPicture.spotlightShowPictureMain.spotlight.visible = true;
        SpotlightShowPicture.spotlightShowPictureMain.init(); 
    }

    // 游戏重新开始
    private restart() {
        if(SpotlightShowPicture.spotlightShowPictureMain.replayBtn.skin.indexOf("disabled") != -1) {
            return;
        }
        SpotlightShowPicture.spotlightShowPictureMain.replayBtn.skin = "common/replay-disabled.png";
        SpotlightShowPicture.spotlightShowPictureMain.reset();       
        SpotlightShowPicture.spotlightShowPictureMain.init(); 
    }
}
