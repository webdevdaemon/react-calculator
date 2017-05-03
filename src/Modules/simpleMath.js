const simpleMath = (op, acc, curr) => {
	acc = Number(acc)
	curr = Number(curr)
    switch (op) {
        case '+':
			return acc + curr
        case '-':
			return acc - curr
		case '*':
			return acc * curr
		case '/':
			return acc / curr
        default:
			return curr
    }
}
let a = ['/', '50', '3']
console.log(simpleMath(a[0], a[1], a[2]))

export default simpleMath
