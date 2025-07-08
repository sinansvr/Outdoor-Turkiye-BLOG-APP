module.exports = (err,req,resizeBy,next)=>{
return res.status(res.errorStatusCode || 500).send({
    error: true,
    message:err.message,
    cause:err.cause,
    body:req.body,
    stack:err.stack
})
} 