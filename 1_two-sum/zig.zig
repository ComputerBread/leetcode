const std = @import("std");
const print = std.debug.print;

var rand: std.Random = undefined;

fn getRandomInt() i32 {
    return rand.intRangeAtMost(i32, -1_000_000_000, 1_000_000_000);
}

// returning an array is undefined behavior, ritard player, big problem
// it was chatGPT (not me lul)
fn generateNums(target: i32) []i32 {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();

    const length = 10000;
    var nums: [length]i32 = undefined;
    var map = std.AutoHashMap(i32, u1).init(allocator);
    defer map.deinit();

    // Generate two random distinct numbers such that nums[i] + nums[j] == target
    const i = rand.uintLessThan(usize, length);
    var j = rand.uintLessThan(usize, length);

    while (i == j) {
        j = rand.uintLessThan(usize, length);
    }

    nums[i] = getRandomInt();
    nums[j] = target - nums[i];
    //    print("RES ({d}: {d}, {d}: {d})\n", .{ i, nums[i], j, nums[j] });
    //    print("RES ({d}+{d}={d}={d})\n", .{ nums[i], nums[j], nums[i] + nums[j], target });

    // Fill the rest of the array with random values, avoiding nums[i] and nums[j]
    for (&nums, 0..) |*item, k| {
        if (k != i and k != j) {
            var value: i32 = 0;
            while (true) {
                value = getRandomInt();
                const sub = target - value;
                if (value == nums[i] or value == nums[j]) continue;
                if (map.contains(sub)) continue;
                map.put(value, 1) catch @panic("map");
                break;
            }
            item.* = value;
        }
    }

    return nums[0..length];
}

pub fn main() void {
    // this shit needs to be inside a fucntion, fucking annyong fucking shit
    var prng = std.rand.DefaultPrng.init(blk: {
        var seed: u64 = undefined;
        std.posix.getrandom(std.mem.asBytes(&seed)) catch @panic("getrandom is shit");
        break :blk seed;
    });
    rand = prng.random();

    const num_runs = 10; // Number of times to repeat the function call
    var total_duration: i64 = 0;

    for (0..num_runs) |i| {

        // init
        const target: i32 = getRandomInt();
        const nums = generateNums(target);

        const start_time: i64 = std.time.microTimestamp(); // Record start time

        //bruteForce(target, nums);
        hashmap(target, nums);

        const end_time: i64 = std.time.microTimestamp(); // Record end time

        const elapsed_time: i64 = end_time - start_time; // Calculate elapsed time
        total_duration += elapsed_time; // Accumulate total duration

        std.debug.print("Run {}: {} microseconds\n", .{ i + 1, elapsed_time });
    }

    const average_duration: i64 = @divTrunc(total_duration, num_runs); // Calculate average duration
    std.debug.print("Average execution time: {} milliseconds\n", .{average_duration});
}

fn bruteForce(target: i32, nums: []i32) void {
    for (nums, 0..) |n, i| {
        for (nums, 0..) |m, j| {
            if (i == j) {
                continue;
            }
            const sum = @addWithOverflow(n, m);
            if (sum[1] == 1) continue;
            if (target == sum[0]) {
                //print("Index 1: {d}, Index 2: {d} \n", .{ i, j });
                //print("{d} + {d} = {d} should be = {d}\n", .{ n, m, n + m, target });
                return;
            }
        }
    }
}

fn hashmap(target: i32, nums: []i32) void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();
    var map = std.AutoHashMap(i32, u1).init(allocator);
    defer map.deinit();

    for (nums) |n| {
        map.put(n, 1) catch @panic("map");
    }
    for (nums) |m| {
        const sub = @addWithOverflow(target, -m);
        if (sub[1] == 1) continue;
        if (map.contains(sub[0])) return;
    }
}
