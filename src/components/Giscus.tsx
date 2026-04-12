import React, { useEffect, useRef } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    // 아래 설정값들은 사용자의 GitHub 저장소 설정에 맞춰 수정해야 합니다.
    script.setAttribute('data-repo', '사용자명/저장소명'); 
    script.setAttribute('data-repo-id', '저장소ID');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', '카테고리ID');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'dark_dimmed');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="mt-10" />;
}
