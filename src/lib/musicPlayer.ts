var test: HTMLAudioElement | undefined = new Audio("/SomewhereNewBadComputer.wav");

if(typeof Audio != "undefined") {
    test = new Audio("/SomewhereNewBadComputer.wav");
}

export const play = () => {
    test?.play();
}

export const pause = () => {
    test?.pause();
}

/*export const duration = (): number  => {
    if(typeof test?.duration != "undefined"){
        return test.duration;
    } else{
        return 0;
    }
}*/