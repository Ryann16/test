'use strict';

const Controller = require('egg').Controller;
const superagent = require('superagent');
const $ = require('jquery');

const range = { begin: 8, end: 10 };

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hi, egg';
    const rawUrl = 'http://hm.vip.qq.com/cgi-bin/HaomaSearch.fcgi?cmd=Search&g_tk=330489105&callback=jQuery183023540382731821552_1514477823170&type=10062&remoteplace=haoma.search.nav&loginUin=1073462288&random=0.0038074476537965918&_=1514477';
    const gusu = 'http://www.gusu8.top/gusu/astar_ajax.asp?v=qqhao&phone=1'
    
    try{
      const numbers = await getNumbers(range);
      const fine = await getGusu(numbers);
      this.ctx.body = { allNum: numbers, fine };
    } catch(err) {
      console.log(err);
    }
    async function getNumbers(range) {
      const numbers = [];
      for (let i = range.begin; i < range.end; i++) {
        const url = `${rawUrl}&page=${i}`;
        console.log(url);
        const res = await superagent.get(url).set('Accept', 'application/javascript');
        const text = res.text.replace(/[^\(]+\(([^\)]+)\)/, '$1');
        const obj = JSON.parse(text).data;
        
        obj.data.forEach(element => {
          numbers.push(element.num);
        });
      }
      return numbers;
    }

    async function getGusu(numbers) {
      console.log(numbers);
      const fine = {};
      numbers = numbers.slice(0,1);
      for(let num of numbers) {
        console.log(num);
        const url = `${gusu}&shu=${num}$ =${Date.now()}`;
        console.log(url);
        const ce = await superagent.get(url);
        const haveZ = ce.text.match(/专家/g) || [];
        console.log(ce);
        // ctx.logger.info('some request data: page %begin - %end %num : %text', range.begin, range.end, num, ce.text);
        if (haveZ.length) {
         if (!fine[haveZ.length]) fine[haveZ.length] = [];
         fine[haveZ.length].push(num);
         console.log(num);
        }
      } 
      return fine;     
    }
  }
}

module.exports = HomeController;
