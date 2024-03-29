const menuItems = {
  main: {
    items: [
      {
        label: 'Главная',
        icon: 'home',
        link: '/',
      },
      {
        label: 'Запросы',
        icon: 'menu_dot',
        link: '/requests',
        count: 16,
      },
      {
        label: 'Заметки',
        icon: 'label',
        link: '/notes',
      },
      {
        label: 'Категории',
        icon: 'files',
        link: '/categories',
      },
      {
        label: 'Пользователи',
        icon: 'group',
        link: '/users',
      },
      {
        label: 'Статистика',
        icon: 'stats',
        link: '/statistics',
      },
      {
        label: 'Избранное',
        icon: 'star',
        link: '/favourites',
      },
      {
        label: 'Поддержка',
        icon: 'chat',
        link: '/support',
      }
    ],
  },
  info: {
    label: 'Информация',
    items: [
      {
        label: 'База знаний',
        icon: 'question',
        link: '/education',
        content: {
          title: 'Настройки профиля',
          menuItems: [
            {label: 'Настройки профиля', link: 'profile_section_1'},
            {label: 'Профиль пользователя', link: 'profile_section_2'},
            {label: 'Изменение общих настроек', link: 'profile_section_3'},
            {label: 'Дополнительные возможности', link: 'profile_section_4'},
            {label: 'Отправка запросов', link: 'profile_section_5'},
            {label: 'Работа со стастистикой', link: 'profile_section_6'},
          ]
        }
      },
      {
        label: 'Обновления',
        icon: 'updates',
        link: '/updates',
      },
    ]
  },
  settings: {
    label: 'Настройки',
    items: [
      {
        label: 'Профиль',
        icon: 'profile',
        link: '/profile',
      },
      {
        label: 'Общие настройки',
        icon: 'settings',
        link: '/settings',
      },
    ]
  }
};

let onUserDropdownCLick = false;

document.addEventListener('DOMContentLoaded', function () {
  renderSideMenuItems();
  renderContentMenu();
})

document.querySelector('body').addEventListener('click', function (e) {
  const userDropdown = document.querySelector('.user-dropdown-body');
  if (userDropdown.classList.contains('active') && !onUserDropdownCLick) userDropdown.classList.remove('active');
  onUserDropdownCLick = false;
})

function renderSideMenuItems() {
  const sideMenu = document.querySelector('.side-menu');
  Object.entries(menuItems).forEach(([key, value], i) => {
    const menuSection = document.createElement('div');
    menuSection.classList.add('menu-section');
    let menuSectionLabel = null;
    if (value.label) {
      menuSectionLabel = document.createElement('div');
      menuSectionLabel.classList.add('menu-section-label');
      menuSectionLabel.innerText = value.label;
      menuSection.appendChild(menuSectionLabel);
    }
    let menuList = document.createElement('ul');
    menuList.classList.add('menu-list');
    value.items.forEach(item => {
      let menuListItem = document.createElement('li');
      menuListItem.classList.add('menu-list-item');
      menuListItem.setAttribute('data-value', item.link);
      menuListItem.addEventListener('click',()=>selectSideMenuItem(item.link))
      if (item.link === '/education')
        menuListItem.classList.add('active');
      menuListItem.innerHTML = `
                                    <div class="menu-list-item-icon">
                                        <img src="./src/img/icons/${item.icon}.svg" alt="">
                                    </div>
                                    <div class="menu-list-item-label">${item.label}</div>
                                    ${item.count ? `<div class="menu-list-item-badge">${item.count}</div>` : ''}
                                `;
      menuList.appendChild(menuListItem);
    })
    menuSection.appendChild(menuList);
    sideMenu.appendChild(menuSection);
  })
}

function selectSideMenuItem(selectedItemName) {
  let itemsList = document.querySelectorAll('.menu-list .menu-list-item');
  itemsList = Array.from(itemsList);
  itemsList.forEach(item=>item.classList.remove('active'));
  const selectedItem = document.querySelector(`.menu-list .menu-list-item[data-value="${selectedItemName}"]`);
  selectedItem.classList.add('active');
  if (selectedItemName === '/education') {
    document.querySelector('.content-container.main').classList.add('active');
    document.querySelector('.content-container.demo').classList.remove('active');
  } else {
    document.querySelector('.content-container.main').classList.remove('active');
    document.querySelector('.content-container.demo').classList.add('active');
  }
}

function renderContentMenu() {
  const contentMenu = document.querySelector('.content-menu');
  const activeSection = document.querySelector('.side-menu .menu-list-item.active').getAttribute('data-value');
  const currentContentMenu = Object.entries(menuItems)
    .find(([key, value]) => value.items.find(item => item.link === activeSection))[1].items
    .find(item => item.link === activeSection).content;
  const contentTitle = document.createElement('div');
  contentTitle.classList.add('content-title');
  contentTitle.innerHTML = currentContentMenu.title;
  contentMenu.appendChild(contentTitle);
  let menuList = document.createElement('ul');
  menuList.classList.add('content-menu-list');
  currentContentMenu.menuItems.forEach((item, i) => {
    let menuListItem = document.createElement('li');
    menuListItem.classList.add('content-menu-list-item');
    menuListItem.setAttribute('data-value', item.link);
    menuListItem.addEventListener('click',()=>selectContentMenuItem(item.link))
    if (i === 0) menuListItem.classList.add('active');
    menuListItem.innerHTML = `
                                    <div class="menu-list-item-label">${item.label}</div>
                                `;
    menuList.appendChild(menuListItem);
  })
  contentMenu.appendChild(menuList);
}


function selectContentMenuItem(selectedItemName) {
  let itemsList = document.querySelectorAll('.content-menu-list .content-menu-list-item');
  itemsList = Array.from(itemsList);
  itemsList.forEach(item=>item.classList.remove('active'));
  const selectedItem = document.querySelector(`.content-menu-list .content-menu-list-item[data-value="${selectedItemName}"]`);
  selectedItem.classList.add('active');
}

function toggleSidebar() {
  const sidebar = document.querySelector('.side-menu');
  sidebar.classList.toggle('active');
}

function onTabChange(selectedTabName) {
  let tabs = document.querySelectorAll('.tabs-inner .tab');
  let tabsContent = document.querySelectorAll('.tabs-content-container .tab-content');
  tabs = Array.from(tabs);
  tabsContent = Array.from(tabsContent);
  tabs.forEach(tab => tab.classList.remove('active'));
  tabsContent.forEach(tab => tab.classList.remove('active'));
  const selectedTab = document.querySelector(`.tabs-inner .tab[data-tab="${selectedTabName}"]`);
  const selectedTabContent = document.querySelector(`.tabs-content-container .tab-content[data-tab-content="${selectedTabName}"]`);
  selectedTab.classList.add('active');
  selectedTabContent.classList.add('active');
}

function toggleUserDropdown() {
  onUserDropdownCLick = true;
  setTimeout(()=>{
    document.querySelector('.user-dropdown-body').classList.toggle('active');
  }, 100)
}