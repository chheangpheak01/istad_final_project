import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHeroActions() {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    const handleWatchNow = () => {
        navigate('/more');
    };

    return {
        isSubscribed,
        heroVisible,
        handleSubscribe,
        handleWatchNow
    };
}