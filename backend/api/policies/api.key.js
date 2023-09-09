module.exports = (req, res, next) => {

   
    let expectedApiKey = 'MYcsgLSQ5zeLMFREFmPUKcwwcgu8qNu8';
    
    if(req.header('apiKey')){

        const parts = req.header('apiKey').split(' ');
        
        if (parts == expectedApiKey) {
            return next();
        }
        else{
            return res.status(401).json({ msg: 'Invalid API' });
        }
    }
    else{
        return res.status(401).json({ msg: 'No API Key was found' });
    }
    
  
  };