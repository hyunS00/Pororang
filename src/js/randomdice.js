function shuffle(array) {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        arr.push(array.splice(Math.floor(Math.random() * array.length - 1 - i), 1)[0]);
    }
    return arr;
}

function setVersion($version, version) {
    $version.innerText = version;
}

async function getChampion($version) {
    try {
        const versionResponse = await fetch(
            'https://ddragon.leagueoflegends.com/api/versions.json'
        );
        const versionData = await versionResponse.json();
        const version = versionData[0];
        setVersion($version, version);
        const championResponse = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
        );
        const championData = await championResponse.json();
        return Object.values(championData.data);
    } catch (error) {
        console.error('Error fetching champion data:', error);
        throw error; // Rethrow the error to handle it further, if needed.
    }
}

function setChampion(randomChampion, $pickImages, $pickNames) {
    for (let i in $pickImages) {
        $pickImages[
            i
        ].style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/13.22.1/img/champion/${randomChampion[i].id}.png')`;
    }
    for (let i = 0; i < 5; i++) {
        $pickNames[i].innerText = randomChampion[i].id;
    }
    for (let i = 5; i < 10; i++) {
        $pickNames[i].innerText = randomChampion[i + 5].id;
    }
}

function clickBtn(championData, $pickImages, $pickNames) {
    const newChampionData = [...championData];
    const randomChampion = shuffle(newChampionData);
    setChampion(randomChampion, $pickImages, $pickNames);
}

async function main() {
    let championData = [];

    const $pickImages = [];
    const $pickNames = [];

    const $version = document.querySelector('.patch-version');

    const $reBtn = document.querySelector('.reBtn');

    $reBtn.addEventListener('click', () => clickBtn(championData, $pickImages, $pickNames));
    for (let i = 0; i < 20; i++) {
        $pickImages.push(document.querySelector(`.pick${i + 1}-img`));
    }
    for (let i = 0; i < 5; i++) {
        $pickNames.push(document.querySelector(`.pick${i + 1}-name >div`));
    }

    for (let i = 10; i < 15; i++) {
        $pickNames.push(document.querySelector(`.pick${i + 1}-name >div`));
    }

    try {
        championData = await getChampion($version);
        clickBtn(championData, $pickImages, $pickNames);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
