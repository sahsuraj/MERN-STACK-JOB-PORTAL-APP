export const testPostController = (req, res) => {
    const { name } = req.param;
    res.status(200).send(`Your Name Is ${name}`);
};
