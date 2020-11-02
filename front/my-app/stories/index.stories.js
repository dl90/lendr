import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo'; // 这里引入你想展示的组件
import './r23.css';
import './r24.css';
import './r25.css';
import './common.css';
import email_png from './assets/img/email.png';
import hear_fill_png from './assets/img/heart-fill.png';
import heart_png from './assets/img/heart.png';
import logout_png from './assets/img/logout.png';
import pengyou_png from './assets/img/pengyou.png';
import point_png from './assets/img/point.png';
import xiaoxi_png from './assets/img/xiaoxi.png';

storiesOf('23', module)
  .add('R23', () => (  // 一个 add 表示添加一个 story
    <header>
        <div class="storybook-div">
            <div class="row">
                <div class="lowline">
                    <a href="https://www.baidu.com" class="storybook-a">Rename</a>
                    
                </div>
                <div class="lowline">
                    <a href="Delete" class="storybook-a">Delete</a>
                </div> <div class="lowline">
                <a href="Unavailable" class="storybook-a">Unavailable</a>
                </div>
            </div>
        </div>
        <div class="storybook-div1">
            <div class="row">
                <div class="lowline">
                    <a href="Edit" class="storybook-a">Edit</a>
                </div>
                <div class="lowline">
                    <a href="Delete" class="storybook-a">Delete</a>
                </div>
            </div>
        </div>
    </header>
  ));  

storiesOf('24', module)
.add('R24', () => (  // 一个 add 表示添加一个 story
    <header>
        <div class="storybook-div24">
            <div>
                <div class="cent">
                    <img src={xiaoxi_png} class="img"></img>
                    <div class="storybook-a24">
                        <a href="https://www.baidu.com">Notifications</a>
                    </div>
                </div>
                <div class="cent">
                    <img src={pengyou_png} class="img"></img>
                    <div class="storybook-a24">
                        <a href="Sharewithfriends">Share with friends</a>
                    </div>
                </div>
                <div class="cent">
                    <img src={logout_png} class="img"></img>
                    <div class="storybook-a24">
                        <a href="Logouts">Log out</a>
                    </div>
                </div>
                <div class="cent">
                    <img src={point_png} class="img"></img>
                    <div class="storybook-a24">
                        <a href="Report">Report</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
));

storiesOf('25', module)
.add('R25', () => (  // 一个 add 表示添加一个 story
    <header>
        <div class="storybook-div25">
            <div>
                <div class="cent">
                    <img src={email_png} class="img"></img>
                    <div class="storybook-a25">
                        <a href="Spam">Spam</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
));


storiesOf('27', module)
.add('R27', () => (  // 一个 add 表示添加一个 story
    <header>
        <div>
        <div class="cent">
            <a href="Spam">
                <img src={heart_png} class="img"></img>
            </a>
            <a href="Spam">
                <img src={hear_fill_png} class="img"></img>
            </a>
        </div>
        </div>
    </header>
));