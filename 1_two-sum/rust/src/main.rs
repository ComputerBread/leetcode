// generated with chatgpt from the javascript version
// modified it a bit, seems to be ok, was too lazy to write it myself, just
// wanted to czech the perf
use rand::Rng;
use std::collections::HashMap;
use std::time::Instant;

// Generate a random number between min and max (inclusive)
fn get_random_num(min: i32, max: i32) -> i32 {
    let mut rng = rand::thread_rng();
    rng.gen_range(min..=max)
}

fn generate_data() -> (Vec<i32>, i32, usize, usize) {
    const MIN_VAL: i32 = -1_000_000_000;
    const MAX_VAL: i32 = 1_000_000_000;
    const LENGTH: usize = 10_000;

    let target = get_random_num(MIN_VAL, MAX_VAL);
    let mut nums = vec![0; LENGTH];

    let i = get_random_num(0, LENGTH as i32) as usize;
    let mut j = get_random_num(0, LENGTH as i32) as usize;
    while i == j {
        j = get_random_num(0, LENGTH as i32) as usize;
    }

    nums[i] = get_random_num(MIN_VAL, MAX_VAL);
    nums[j] = target - nums[i];

    let mut map = HashMap::new();
    for k in 0..LENGTH {
        if k == i || k == j {
            continue;
        }

        loop {
            let value = get_random_num(MIN_VAL, MAX_VAL);
            if value == nums[i] || value == nums[j] || map.contains_key(&(target - value)) {
                continue;
            }
            map.insert(value, true);
            nums[k] = value;
            break;
        }
    }

    (nums, target, i, j)
}

fn brute_force(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    for i in 0..nums.len() {
        for j in 0..nums.len() {
            if i == j {
                continue;
            }
            let sum = nums[i].checked_add(nums[j]);
            let s = match sum {
                None => continue,
                Some(sum) => sum,
            };
            if s == target {
                return Some((i, j));
            }
        }
    }
    None
}

fn hmap(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let mut map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        map.insert(num, i);
    }

    for (i, &num) in nums.iter().enumerate() {
        if let Some(&j) = map.get(&(target - num)) {
            return Some((i, j));
        }
    }
    None
}

fn is_res_correct(data: &(Vec<i32>, i32, usize, usize), res: Option<(usize, usize)>) -> bool {
    if let Some((i, j)) = res {
        (data.2 == i && data.3 == j) || (data.2 == j && data.3 == i)
    } else {
        false
    }
}

fn benchmark<F>(methods: Vec<F>, run_nb: usize)
where
    F: Fn(&[i32], i32) -> Option<(usize, usize)>,
{
    for method in methods {
        let mut total_time = 0.0;
        let mut times = vec![];
        let name = format!("{}", std::any::type_name::<F>());
        for _ in 0..run_nb {
            let data = generate_data();

            let start = Instant::now();
            let res = method(&data.0, data.1);
            let duration = start.elapsed();

            assert!(is_res_correct(&data, res));

            let time = duration.as_secs_f64() * 1000.0;
            total_time += time;
            times.push(time);
        }
        println!(
            "{}: times: {:?}, avg: {:.2}ms",
            name,
            times,
            total_time / run_nb as f64
        );
    }
}

fn main() {
    benchmark(vec![brute_force, hmap], 100);
}
