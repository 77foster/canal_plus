import indexApi from '../api/indexApi.js';
const api = new indexApi()
export default class indexController{
  async dashboard(req, res ){
    const data = await api.getVehicules();
    const lengthData = data?.length ;
    res.render('index', {nbr:lengthData});
  }
 
  async float(req, res){
    const data = await api.getVehicules()
    res.render('float', {data});
  }
  async rapports(req, res){
    const data = await api.getVehicules()
    res.render('rapports', {data});
  }
  async rapportPost(req, res){
    let data = req.body;
    const newData = {};
    for (const key in data) {
      if (key !== "start" && key !== "end") {
        newData[key] = data[key];
      }
    }
    const nData = await api.rapport(data['start'], data['end'], newData)
    res.render('pdf');
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

  profil(req, res ){
    
    res.render('profil');
  }

  async chart(req, res){
    const data = await api.chart()
    res.json(data)
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
