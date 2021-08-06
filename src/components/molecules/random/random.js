import BasicAtom from "../../atoms/basicAtom";
import Input from "../input/input";
import Button from "../../atoms/button/button";

class Random extends BasicAtom {
    constructor(props, context) {
        super(props, context, {list: []});
        this.state.list = this.props.list;
    }

    componentDidMount() {
        super.componentDidMount();
        this.shuffleList();
    }

    shuffleList() {
        this.setState({list: this.shuffle([...this.state.list])});
    }

    /**
     * Shuffle
     * @param array
     * @return {*}
     */
    shuffle(array) {
        let currentIndex = array.length;
        let randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }


    render() {
        return(
            <>
                {this.state.list.map((value, index) => {
                    return (
                        <p key={index}>
                            {value}
                        </p>
                    );
                })}
                <Button onClick={() => {this.shuffleList()}}>Shuffle</Button>
            </>
        );
    }
}

export default Random;