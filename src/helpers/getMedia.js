import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';

const useMediaRules = () => {
  const [media, setMedia] = useState('mobile');

  const isMobile = useMedia('(max-width:767px)');
  const isDesktop = useMedia('(min-width:1280px)');

  useEffect(() => {
    if (isMobile) {
      setMedia('mobile');
    } else if (isDesktop) {
      setMedia('desktop');
    } else {
      setMedia('tablet');
    }
  }, [isDesktop, isMobile]);

  return media;
};

export default useMediaRules;
