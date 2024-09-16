const video = document.getElementById('video');

// 创建音频元素
const beepSound = new Audio();
beepSound.src = 'beep.mp3'; // 确保 beep.mp3 文件存在于服务器的静态资源中
beepSound.currentTime = 0;

// 请求摄像头权限
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing the camera: ", err);
    });

function captureAndSendPicture() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append('image', blob);

        fetch('https://mi.up520.cn:56777/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'situation1') {
                startBeeping();
            } else if (data === 'situation0') {
                stopBeeping();
            }
        })
        .catch(err => {
            console.error("Error uploading the image: ", err);
        });
    }, 'image/jpeg');
}

let beepInterval;

function startBeeping() {
    if (!beepInterval) {
        beepSound.currentTime = 0;
        beepSound.play()
        beepInterval = setInterval(() => {
            beepSound.currentTime = 0;
            beepSound.play(); // 播放声音

        }, 2000);
        document.body.style.backgroundColor="#FF0000";
    }
}

function stopBeeping() {
    if (beepInterval) {
        clearInterval(beepInterval);
        beepInterval = null;
        beepSound.pause(); // 停止声音
        beepSound.currentTime = 0; // 重置音频播放位置
        document.body.style.backgroundColor="#FFFFFF";
    }
}

// 每秒拍摄一张照片并上传
setInterval(captureAndSendPicture, 1000);
