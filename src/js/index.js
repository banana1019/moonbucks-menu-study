// step2 요구사항 - 상태 관리로 메뉴 관리하기

// localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
// TODO localStorage Read & Write
// - [] localStorage에 데이터를 저장한다.
//  - [x] 메뉴를 추가할 때
//  - [x] 메뉴를 수정할 때
//  - [x] 메뉴를 삭제할 때
// - [] localStorage에 있는 데이터를 읽어온다.

// 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
// TODO 카테고리별 메뉴판 관리
// - [] 에스프레소 메뉴판
// - [] 프라푸치노 메뉴판
// - [] 블렌디드 메뉴판
// - [] 티바나 메뉴판
// - [] 디저트 메뉴판

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// - [] 로컬스토리지에서 에스프레소 메뉴 데이터를 읽어온다.
// - [] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태 관리
// 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [] 품절 버튼을 추가한다.
// - [] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [] 클릭 이벤트 추가

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  // 상태는 '변하는 데이터', 이 앱에서 변하는 것이 무엇인가? -> 메뉴명
  this.menu = [];
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
      // console.log(this.menu);
    }
    render();
  };

  const render = () => {
    const template = this.menu
      .map((item, index) => {
        return `
          <li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${item.name}</span>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
            > 
              수정
            </button>
            <button
              type="button"
              class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
            >
              삭제
            </button>
          </li>`;
      })
      .join(""); // Array.prototype.join() : join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.

    // html 코드를 넣을 때는 innerHTML 이라는 속성으로 넣을 수 있다.
    // $("#espresso-menu-list").innerHTML = menuItemTemplate(espressoMenuName);
    // innerHTML을 사용하면 기존 내용이 지워져버린다.
    // 밑에 추가되는 형태로 만들어야 됨
    // Element.insertAdjacentHTML() 메서드를 사용하자

    // 위에서 하나의 문자열로 만들었으니까 innerHTML로 한 번에 넣어준다.
    $("#espresso-menu-list").innerHTML = template;

    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`; // HTMLElement.innerText
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요!");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value; // input 태그에 입력한 값
    console.log(espressoMenuName);
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    render();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    // 수정 버튼을 눌렀을 때
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form 태그가 자동으로 전송되는 걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 확인 버튼으로 사용자가 입력한 메뉴 추가
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName); // 파라미터를 안 받는 함수는 함수이름만 적어도 된다.

  // 엔터키로 사용자가 입력한 메뉴 추가
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

// App();

const app = new App();
app.init();
