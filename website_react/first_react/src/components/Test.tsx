function Test(prom) {
    return (
        <p onClick = { prom.change }> hello world { (prom.isShow) ? 1 : 100 } </p>
    );
}
export default Test;