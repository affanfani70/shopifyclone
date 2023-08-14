let music = new Audio('songs/1.mp3')
// music.play()

let songs = [
    {
        id: '1',
        songName: `Barisho Main <br>
                <div class="subtitle">Darshan raval</div>`,
        coverPath: 'covers/1.jpg',
    },
    {
        id: '2',
        songName: `Dil Ek villan <br>
                <div class="subtitle">Darshan raval</div>`,
        coverPath: 'covers/2.jpg',
    },
    {
        id: '3',
        songName: `Galliyan retruns<br>
                <div class="subtitle">Darshan raval</div>`,
        coverPath: 'covers/3.jpg',
    },
    {
        id: '4',
        songName: `Haseen ho gi<br>
                <div class="subtitle">Darshan raval</div>`,
        coverPath: 'covers/4.jpg',
    },
]
let songsTitle = [
    {
        id: '1',
        songName: 'barisho Main',
        subtitle: 'Darshan raval',
        
    },
    {
        id: '2',
        songName: 'Dill Ek villan',
        subtitle: 'Darshan raval',
        
    },
    {
        id: '3',
        songName: 'Galliyan retruns',
        subtitle: 'Darshan raval',
        
    },
    {
        id: '4',
        songName: 'Haseen ho gi',
        subtitle: 'Darshan raval',
        
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index].coverPath
    element.getElementsByTagName('h5')[0].innerHTML = songs[index].songName
})
Array.from(document.getElementsByClassName('sonItem')).forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index].coverPath
    element.getElementsByTagName('h5')[0].innerHTML = songs[index].songName
})

let playButton = document.getElementById('playButton');
let wave = document.getElementsByClassName('wave')[0];
playButton.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play()
        // console.log('play')
        playButton.classList.remove('bi-play-fill')
        playButton.classList.add('bi-pause-fill')
        wave.classList.add('active2')

    } else {
        // console.log('pause')
        music.pause()
        playButton.classList.remove('bi-pause-fill')
        playButton.classList.add('bi-play-fill')
        wave.classList.remove('active2')
    }
})
const playAllSongs = () => {
    Array.from(document.getElementsByClassName('playList')).forEach(element => {
        element.classList.add('bi-play-circle')
        element.classList.remove('bi-pause-circle')
    })
}
const backgroundAllSongs = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach(element => {
        element.style.background = 'rgb(105,105,170, 0)'
    })
    Array.from(document.getElementsByClassName('sonItem')).forEach(element => {
        element.style.background = 'rgb(105,105,170, 0)'
    })
}
let songIndex = 0;
let playList = Array.from(document.getElementsByClassName('playList'));
let posterPlayButton = document.getElementById('posterPlayButton')
let title = document.getElementById('title')
let subtitle = document.getElementsByClassName('subtitle')
playList.forEach(element => {
    element.addEventListener('click', (e) => {
        songIndex = e.target.id;
        playAllSongs()
        e.target.classList.add('bi-pause-circle');
        e.target.classList.remove('bi-play-circle');
        music.src = `songs/${songIndex}.mp3`;
        posterPlayButton.src = `covers/${songIndex}.jpg`
        music.play()
        title.innerText = songsTitle[songIndex-1].songName
        subtitle.innerHTML = songsTitle[songIndex-1].subtitle
        
        playButton.classList.remove('bi-play-fill')
        playButton.classList.add('bi-pause-fill')
        wave.classList.add('active2')
        music.addEventListener('ended',()=>{
            playButton.classList.add('bi-play-fill')
            playButton.classList.remove('bi-pause-fill')
            wave.classList.remove('active2')
        })
        backgroundAllSongs();
        Array.from(document.getElementsByClassName('songItem'))[`${songIndex-1}`].style.background = 'rgb(105, 105, 170, .1)'
        Array.from(document.getElementsByClassName('sonItem'))[`${songIndex-1}`].style.background = 'rgb(105, 105, 170, .1)'
    })
})

let currentStart=document.getElementById('currentStart');
let currentEnd=document.getElementById('currentEnd');
let seek= document.getElementById('seek');
let bar2= document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let min1 = Math.floor(music.duration/60)
    let sec1 = Math.floor(music.duration%60)
    if (sec1<=9) {
        sec1 = `0${sec1}`;
    }
    currentStart.innerText=`0${min1}:${sec1}`

    let min = Math.floor(music.currentTime/60)
    let sec = Math.floor(music.currentTime%60)
    if (sec<=9) {
        sec = `0${sec}`;
    }
    currentEnd.innerText=`0${min}:${sec}`

    let prograssBar = parseInt((music.currentTime/music.duration)*100)
    seek.value = prograssBar;
    bar2.style.width = `${seek.value}%`
    dot.style.left = `${seek.value}%`
})
seek.addEventListener('change',()=>{
    music.currentTime =  (seek.value * music.duration/100)
})
music.addEventListener('ended',()=>{
    console.log('endded')
    playButton.classList.add('bi-play-fill')
    playButton.classList.remove('bi-pause-fill')
    wave.classList.remove('active2')
})

let volIcon = document.getElementById('volIcon')
let vol = document.getElementById('vol') //input
let volBar = document.getElementsByClassName('volBar')[0]
let volDot = document.getElementById('volDot')

vol.addEventListener('change',()=>{
    if (vol.value==0) {
        volIcon.classList.remove('bi-volume-down-fill')
        volIcon.classList.add('bi-volume-mute-fill')
        volIcon.classList.remove('bi-volume-up-fill')
    }else if(vol.value > 0 ){
        volIcon.classList.add('bi-volume-down-fill')
        volIcon.classList.remove('bi-volume-mute-fill')
        volIcon.classList.remove('bi-volume-up-fill')
    }else if (vol.value >=50) {
        volIcon.classList.remove('bi-volume-down-fill')
        volIcon.classList.remove('bi-volume-mute-fill')
        volIcon.classList.add('bi-volume-up-fill')
    }
    let vol_a = vol.value;
    volBar.style.width = `${vol_a}%`;
    volDot.style.left = `${vol_a}%`;
    music.volume = vol_a/100
})

let next = document.getElementById('next')
let back = document.getElementById('back')
next.addEventListener('click',()=>{
    songIndex+=1;
    if (songIndex> document.getElementsByClassName('songItem').length) {
        songIndex=1
    }
    playAllSongs()   
    music.src = `songs/${songIndex}.mp3`;
    posterPlayButton.src = `covers/${songIndex}.jpg`
    music.play()
    // title.innerText = songs[songIndex-1].songName
    // let song_title = songs.filter((ele) => {
    //     return ele.id = songIndex;
    // })
    // song_title.forEach(ele => {
    //     let {songName} = ele
    //     title.innerHtml = songName
    // })
    
    document.getElementById(`${songIndex}`).classList.remove('bi-play-circle')
    document.getElementById(`${songIndex}`).classList.add('bi-pause-circle')
    document.getElementById(`${songIndex}`).classList.add('bi-pause-circle')
    backgroundAllSongs();
    Array.from(document.getElementsByClassName('songItem'))[`${songIndex-1}`].style.background = 'rgb(105, 105, 170, .1)'
    Array.from(document.getElementsByClassName('sonItem'))[`${songIndex-1}`].style.background = 'rgb(105, 105, 170, .1)'

})
back.addEventListener('click',()=>{
    songIndex-=1;
    if (songIndex<1 ) {
        songIndex=document.getElementsByClassName('songItem').length
    }
    playAllSongs()   
    music.src = `songs/${songIndex}.mp3`;
    posterPlayButton.src = `covers/${songIndex}.jpg`
    music.play()
    title.innerText = songsTitle[songIndex-1].songName
    subtitle.innerHTML = songsTitle[songIndex-1].subtitle
    // let song_title = songs.filter((ele) => {
    //     return ele.id = songIndex;
    // })
    // song_title.forEach(ele => {
    //     let {songName} = ele
    //     title.innerHtml = songName
    // })
    
    document.getElementById(`${songIndex}`).classList.remove('bi-play-circle')
    document.getElementById(`${songIndex}`).classList.add('bi-pause-circle')
    backgroundAllSongs();
    Array.from(document.getElementsByClassName('songItem'))[`${songIndex-1}`].style.background = 'rgb(105, 105, 170, .1)'
    Array.from(document.getElementsByClassName('sonItem'))[`${songIndex-1}`].style.background = 'rgb(105, 105, 170, .1)'
})

let leftScroll = document.getElementById('leftScroll')
let rightScroll = document.getElementById('rightScroll')
let popSong = document.getElementsByClassName('popSong')[0];
leftScroll.addEventListener('click',()=>{
    console.log('clicked')
    popSong.scrollLeft -=330
})
rightScroll.addEventListener('click',()=>{
    console.log('clicked')
    popSong.scrollLeft +=330
})

let leftScrolls = document.getElementById('leftScrolls')
let rightScrolls = document.getElementById('rightScrolls')
let item = document.getElementsByClassName('item')[0];

leftScrolls.addEventListener('click',()=>{
    console.log('clicked')
    item.scrollLeft -=330
})
rightScrolls.addEventListener('click',()=>{
    console.log('clicked2')
    item.scrollLeft +=330
})
