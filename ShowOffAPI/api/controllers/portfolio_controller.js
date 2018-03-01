const Portfolio = require('../models/portfolio');
// const router = express.Router();

class PortfolioController {
    constructor(router) {
        router.route('/portfolio')
            .get(this.add);
        router.route('/portfolio/get')
            .get(this.getAll);
        router.route('/')
            .get(this.test);
    
    }

    

    async test(req, res, next) {
        try { 
            console.log('THIS IS A TEST');
            res.json({message: 'portfolio endpoint hit!!1'});
        } catch (e) {
            console.log('Error:', e);
            res.json({error: e});
        }
    }

    async getAll(req, res, next) {
        try {
            console.log('GET-ALL ENDPOINT HIT');
            res.json({message: 'getall endpoint hit'});
        } catch (e) {
            console.log('errrror:', e)
        }
    }

    async add(req, res, next) {
        try {
            console.log('ADD ENDPOINT HIT');
            res.json({message: 'add endpoint hit'});
        } catch (e) {
            console.log('moar errors:', e)
        }
    }
}

module.exports = PortfolioController;