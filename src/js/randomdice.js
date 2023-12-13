{
    function shuffle(array) {
        let arr = [];
        for (let i = 0; i < 30; i++) {
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
            ].style.backgroundImage = `url('https://ddragon.leagueoflegends.com/cdn/${randomChampion[i].version}/img/champion/${randomChampion[i].id}.png')`;
            $pickImages[i].style.backgroundSize = `cover`;
        }
        for (let i = 0; i < 5; i++) {
            $pickNames[i].innerText = randomChampion[i].id;
        }
        for (let i = 5; i < 20; i++) {
            $pickNames[i].innerText = randomChampion[i + 5].id;
        }
        console.log(randomChampion);
    }

    function clickBtn(championData, $pickImages, $pickNames, isFirst) {
        let result = true;
        if (isFirst.bool) {
            isFirst.bool = false;
        } else {
            result = window.confirm('챔피언 데이터가 사라집니다 계속 하시겠습니까?');
        }

        if (result) {
            const newChampionData = [...championData];
            const randomChampion = shuffle(newChampionData);
            setChampion(randomChampion, $pickImages, $pickNames);
        }
    }

    async function main() {
        const $backgound = document.querySelector('.backgound');
        $backgound.style.backgroundImage = `url('./src/img/sizak2.jpeg')`;
        $backgound.style.backgroundRepeat = 'no-repeat';
        $backgound.style.backgroundSize = 'cover';

        let championData = [];

        const $pickImages = [];
        const $pickNames = [];

        const $version = document.querySelector('.patch-version');

        const $reBtn = document.querySelector('.reBtn');
        const isFirst = { bool: 1 };

        $reBtn.addEventListener('click', () =>
            clickBtn(championData, $pickImages, $pickNames, isFirst)
        );
        for (let i = 0; i < 30; i++) {
            $pickImages.push(document.querySelector(`.pick${i + 1}-img`));
        }
        for (let i = 0; i < 5; i++) {
            $pickNames.push(document.querySelector(`.pick${i + 1}-name >div`));
        }

        for (let i = 10; i < 25; i++) {
            $pickNames.push(document.querySelector(`.pick${i + 1}-name >div`));
        }

        try {
            championData = await getChampion($version);
        } catch (error) {
            console.error('Error in main function:', error);
        }
    }

    // const $form = document.querySelector('form');
    // const $password = document.querySelector('#password');
    // const $main = document.querySelector('#main');

    // $form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     const password = $form.elements.password.value;

    //     if (password === ProcessingInstruction.env.PASSWORD) {
    //         $password.style.display = 'none';
    //         $main.style.display = 'block';
    //         main();
    //     } else {
    //     }
    // });
    main();
}
