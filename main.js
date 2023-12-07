//img wrap の要素を全て取ってくる。
let imagesItems = [...document.querySelectorAll(".img-wrap")];
//h2　の要素を全て取ってくる。
let titles = [...document.querySelectorAll("h2")];
//title の要素をとる。
let titleMessage = document.querySelector(".title");

//いつアクティブにするのかを決めるオプション
let options = {
    rootMargin: "0px", //交差を検知するルート要素からの距離、基本０で良さそう
    threshold: 0.3, // これが１だとスクロールして画像が完全に画面上に出きったときになる。
};

//特定の位置に来たとき、activeを付加する関数。
let setItemActive = (entries) => {
    entries.forEach((entry) => {
        //その特定のアイテムがエントリーしてきてintersectしたらのif文
        if(entry.isIntersecting) {
            entry.target.classList.add("active");   
        }else{
            entry.target.classList.remove("active");
        }
    });
};

//今回のメイン機能　どこにいるか監視する。ある特定の位置を越えると作動する関数　(intersection observer)
let observer = new IntersectionObserver(setItemActive,options);

//タイトルメッセージの位置にきたかどうか監視する。
observer.observe(titleMessage);

//img wrap は偶数と奇数で出現する場所を変えるコード
imagesItems.map((item,index) => {
    item.children[0].style.backgroundImage = `url(/images/${index +1}.jpg)`;
    index % 2 == 0 ?(item.style.left = "55%") : (item.style.left = "5%");
    observer.observe(item);
});
//title (h2)要素も同じく偶数、奇数で出現する場所を交互にするコード
titles.map((title, index) => {
    index %2 == 0 ? (title.style.left = "10%") : (title.style.left = "55%");
    observer.observe(title);
});
