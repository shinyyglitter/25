const abTest = (req, res, next) =>{
    
    let variant = req.cookies.ab_variants;

    if(!variant){
        variant = Math.random()<0.5 ? 'A':'B';
        //lagrer varianten
        res.cookie('ab_variant', variant, { maxAge: 1000 * 60 * 60 * 24 * 30 });
    }

    req.abTestVariant = variant;
    
    next()
}

export default abTest;