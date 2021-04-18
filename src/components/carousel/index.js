import Card from '../card/index.js';
import './style.css';
import { useState } from 'react';

function Carousel() {
    const dishes = [{
        name: 'Jalebi',
        img: 'jalebi.jpeg',
        price: '30',
        category: 'sweet'
    },
    {
        name: 'Hira Sweet',
        img: 'hira-sweet.jpeg',
        price: '50',
        category: 'sweet'
    },
    {
        name: 'Kesar Sweet',
        img: 'kesar-sweet.jpeg',
        price: '100',
        category: 'sweet'
    },
    {
        name: 'Berger',
        img: 'berger.jpeg',
        price: '60',
        category: 'fast food'
    },
    {
        name: 'Spring Rolls',
        img: 'rolls.jpeg',
        price: '70',
        category: 'fast food'
    },
    {
        name: 'Noodles',
        img: 'noodles.jpeg',
        price: '60',
        category: 'fast food'
    },
    {
        name: 'Chicken Biryani',
        img: 'chicken-biryani.jpeg',
        price: '200',
        category: 'non-veg'
    },
    {
        name: 'Biryani Masala',
        img: 'biryani-masala.jpeg',
        price: '20',
        category: 'non-veg'
    },
    {
        name: 'Tandoori',
        img: 'tandoori.jpeg',
        price: '250',
        category: 'non-veg'
    }];
    let categories = Array.from(new Set(dishes.map((dish) => dish.category)));
    categories.unshift('all');
    let [slides, setSlides] = useState(dishes);
    let [selectedCtg, setFiterCategory] = useState('all');

    let [x, setX] = useState(0);
    let [activeSlide, setActiSlide] = useState(0);
    let [isLeftEnabled, setLeftEnable] = useState(true);
    let [isRightEnabled, setRightEnable] = useState(false);
    function onLeftClick() {
        if (x === -100) {
            setLeftEnable(true);
        }
        isRightEnabled && setRightEnable(false);
        setX(x + 100);
        setActiSlide(activeSlide - 1);
    }
    function onRightClick() {
        if (x === -100 * (slides.length - 2)) {
            setRightEnable(true);
        }
        isLeftEnabled && setLeftEnable(false);
        setX(x - 100);
        setActiSlide(activeSlide + 1);
    }

    const onFilterChange = (e) => {
        let selectedFilter = e.target.value;
        setFiterCategory(selectedFilter);
        setX(0);
        setActiSlide(0);
        let slide = selectedFilter === 'all' ? dishes : dishes.filter((dish) => dish.category === selectedFilter);
        setSlides(slide);
        setLeftEnable(true)
    }
    return (<div className={`carosuel`}>
        {!isLeftEnabled && <button className={`btn btn-left`} onClick={onLeftClick}>{'<'}</button>}
        <div className={`track-container`}>
            <ul className={`track`}>
                {slides && slides.map((ele, index) =>
                    <li key={index} className={`slide`} style={{ left: `${(activeSlide > 0 && index === slides.length - 1 ? 10 * activeSlide : 0) + (activeSlide === 1 && index === 0 ? 10 : 0) + (index === 0 ? 0 : 90 + (index - 1) * 80)}%`, transform: `translateX(${x}%)`, width: `${index === 0 || slides.length - 1 === index ? '90%' : '80%'}` }}><Card data={ele} /></li>
                )}
            </ul>
        </div>
        {!isRightEnabled && <button className={`btn btn-right`} onClick={onRightClick}>{'>'}</button>}
        {categories && <div className={`catg`}>
            Filter By category
            <select value={selectedCtg} onChange={onFilterChange}>
                {categories.map((catg, index) => <option key={index} value={catg}>{catg}</option>)}
            </select>
        </div>}
    </div>)
}

export default Carousel;