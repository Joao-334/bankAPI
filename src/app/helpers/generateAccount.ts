export const generateAccount = async () => {

    const model = {
        number: genNumberAccount(),
        agency: '0001',
        balance: 0
    };

    return model;
};

function genNumberAccount() {
    let string = '';
    createNumber();

    function genNumbers() {

        function generating() {
            const number = Math.floor(Math.random() * Math.ceil(Math.random() * 9));
            const number2 = Math.ceil(Math.random() * Math.floor(Math.random() * 9));

            return [number, number2];
        }

        let [number, number2] = generating();

        while (number === number2 || number === parseInt(string.charAt(string.length - 1)) || number2 === parseInt(string.charAt(string.length - 1))) {
            [number, number2] = generating();
        }

        return [number, number2];

    }

    function createNumber() {
        for (let index = 0; string.length < 8; index++) {
            const [number, number2] = genNumbers();

            number > number2 ? string = `${string}${number}${number2}` : string = `${string}${number2}${number}`;
        }

    }

    return string;
}
