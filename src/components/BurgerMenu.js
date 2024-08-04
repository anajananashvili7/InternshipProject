import React, { useState } from 'react';
import styles from '../app/page.module.css'


const BurgerMenu = ({ categories, onCategoryClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.burgerMenu}>
            <button className={styles.burgerButton} onClick={handleToggle}>
                &#9776; {/* Unicode character for hamburger icon */}
            </button>
            {isOpen && (
                <div className={styles.menu}>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id} onClick={() => onCategoryClick(category.id)}>
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BurgerMenu;
