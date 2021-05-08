document.querySelector(".control-buttons span").onclick = function() {
    let yourName = prompt("what is your Name?");
    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;
let blocksCotainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksCotainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);


blocks.forEach((block, index) => {
    block.style.order = orderRange[index];



    block.addEventListener('click', function() {
        flipBlock(block);

    });
});


function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped');

    let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
}

function stopClicking() {

    blocksCotainer.classList.add('no-clicking');
    setTimeout(() => {

        blocksCotainer.classList.remove('no-clicking');
    }, duration);
}


function checkMatchBlocks(firstBlock, secoundBlock) {


    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secoundBlock.dataset.technology) {


        firstBlock.classList.remove('is-flipped');
        secoundBlock.classList.remove('is-flipped');



        firstBlock.classList.add('has-match');
        secoundBlock.classList.add('has-match');


        document.getElementById('good').play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secoundBlock.classList.remove('is-flipped');
        }, duration);

        document.getElementById('stop').play();
    }

}

function shuffle(array) {
    let current = array.length,
        temp, random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;


        // save current element in stash
        temp = array[current];
        //current element = random element 
        array[current] = array[random];

        // random element = get element from stash
        array[random] = temp;
    }
    return array;
}