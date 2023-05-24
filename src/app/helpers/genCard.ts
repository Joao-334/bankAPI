import { Schema } from 'mongoose';

export const genCard = async (type: string, id: Schema.Types.ObjectId) => {
    const pseudoRandom = Math.random;

    const prefixList = [
        '7',
        '71',
        '72',
        '73',
        '710',
        '720',
        '730',
        '712',
        '713',
        '721',
        '731',
        '723',
        '732',
    ];

    return {
        ownerId: id,
        number: genNumberCard(prefixList),
        cvc: genCVC(),
        valid: genValid(),
        typeOf: type,
    };




    function genCVC() {
        let cvc = '';

        for (let i = 0; cvc.length < 3; i++) {
            const number = Math.floor(pseudoRandom() * 10);
            cvc = `${cvc}${number}`;
        }

        return cvc;
    }

    function genNumberCard(prefixList: string[]) {
        let numberCard = '';

        const prefixSelect = prefixList[Math.floor(pseudoRandom() * (prefixList.length - 1))];

        numberCard = `${prefixSelect}`;

        for (let index = 0; numberCard.length < 16; index++) {
            const randomNumber = Math.floor(pseudoRandom() * 9);
            numberCard = `${numberCard}${randomNumber}`;
        }
        return numberCard;
    }

    function genValid() {

        let cc = 0;

        const date = new Date();
        let month = date.getMonth() + 1 + Math.floor(pseudoRandom() * 12);
        let year = date.getFullYear();

        while (month > 12) {
            month -= 12;
            cc += 1;
        }
        year += Math.floor(pseudoRandom() * 6) + cc;

        let returnString = '';

        month < 10 ? returnString = `0${month}/${year}` : returnString = `${month}/${year}`;

        return returnString;
    }
};
