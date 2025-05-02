# Proof

## First Principals

**Theorem.** For any integer $n \ge 1$, the derivative of $f(x) = x^n$ is
$$
f'(x) = n x^{n-1}.
$$

**Proof.** By the definition of the derivative (first principles),


$$
f'(x)
= \lim*{h \to 0} \frac{f(x + h) - f(x)}{h}
= \lim*{h \to 0} \frac{(x + h)^n - x^n}{h}.
$$

Expand \((x + h)^n\) via the binomial theorem:
$$
(x + h)^n
= \sum*{k=0}^{n} \binom{n}{k} x^{n-k} h^k
= x^n + \binom{n}{1} x^{n-1}h + \binom{n}{2} x^{n-2}h^2 + \cdots + h^n.
$$
Subtract \(x^n\) and divide by \(h\):
$$
\frac{(x + h)^n - x^n}{h}
= \frac{x^n + n x^{n-1}h + \binom{n}{2}x^{n-2}h^2 + \cdots + h^n - x^n}{h}
= n x^{n-1} + \binom{n}{2}x^{n-2}h + \cdots + h^{\,n-1}.
$$
Now take the limit as \(h \to 0\). Every term containing a positive power of \(h\) vanishes:
$$
f'(x)
= \lim*{h\to 0}\Bigl(n x^{n-1} + \binom{n}{2}x^{n-2}h + \cdots + h^{\,n-1}\Bigr)
= n x^{n-1}.
$$

$$
\boxed{f'(x)=n x^{n-1}}
$$