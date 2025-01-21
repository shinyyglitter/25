export const ListSum = (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send("Bad Request: 'a' og 'b' må være gyldige tall.");
    }
  
    const sum = a + b;
  
    res.status(HTTP_CODES.SUCCESS.OK).send(`Summen av ${a} og ${b} er ${sum}`);
  };