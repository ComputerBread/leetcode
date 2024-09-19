// 1 <= n <= 45
fn climbStairs(n: usize) usize {
    if (n < 1 or n > 45) {
        unreachable;
    }
    if (n == 1) {
        return 1;
    }

    var prev1: usize = 1;
    var prev2: usize = 1;

    for (2..n + 1) |_| {
        const res: usize = prev1 + prev2;
        prev2 = prev1;
        prev1 = res;
    }
    return prev1;
}

const expect = @import("std").testing.expect;
test {
    const TC = struct {
        in: usize,
        out: usize,
    };

    const data = [_]TC{
        TC{ .in = 1, .out = 1 },
        TC{ .in = 2, .out = 2 },
        TC{ .in = 3, .out = 3 },
        TC{ .in = 4, .out = 5 },
        TC{ .in = 5, .out = 8 },
        TC{ .in = 6, .out = 13 },
        TC{ .in = 7, .out = 21 },
        TC{ .in = 8, .out = 34 },
        TC{ .in = 9, .out = 55 },
        TC{ .in = 10, .out = 89 },
    };

    for (data) |val| {
        try expect(climbStairs(val.in) == val.out);
    }
}
