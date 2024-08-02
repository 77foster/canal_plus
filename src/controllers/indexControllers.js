import puppeteer from 'puppeteer'
import indexApi from '../api/indexApi.js';
const api = new indexApi()
export default class indexController{

  index(req, res ){
    
    res.render('index');
  }
  async float(req, res){
    const data = await api.getVehicules()
    res.render('float', {data});
  }
  async rapports(req, res){
    const data = await api.getVehicules()
    res.render('rapports', {data});
  }
  async rapportsPost(req, res){
    let data = req.body;
    if (req.body.start) {
      var startDate = this.#date(req.body.start)
    }
    if (req.body.end) {
      var endDate = this.#date(req.body.end)
    }
    res.send('Data Received: ' + JSON.stringify(data));
  }
  async pdf(req, res){

    res.render('index')
    /*
 
    
  
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const html = await res.render('rapports', data);
      await page.setContent(html);
      const pdf = await page.pdf({
        path: 'document.pdf',
        format: 'A4',
        printBackground: true
      });
      await browser.close();
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=document.pdf'
      });
      res.send(pdf)
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la génération du PDF');
    }*/
  }

  #date(date) {
    const IsoDate = new Date(date);
    const lastDate = new Date(date);
    lastDate.setHours(24, 59, 59, 0);
  
    const startDate = IsoDate.toISOString();
    const endDate = lastDate.toISOString();
  
    return {
      startDate: startDate,
      endDate: endDate,
    };
  }
}
