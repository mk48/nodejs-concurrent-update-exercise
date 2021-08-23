# Prerequisite
1. NodeJs
2. Typescript

# Install
```
git clone https://github.com/mk48/nodejs-concurrent-update-exercise.git
npm install
```

# Run
```
npm start
```

# Problem
The `update()` function is called from many places. Just assume that `update()` is a REST function and being called from many browsers/mobile at same time.

That function takes some delay to do the update process.

## Case 1 : simple no same time
00:00:01 --> browser 1 sends update with id 1 (it takes 10 seconds)
00:00:11 --> browser 2 sends update with id 1 (it takes 9 seconds)
browser 1's update take 10 seconds and 2nd browser update starts at 11th second. so no concurrent update here. It's just simple.

## Case 2 : Concurent update same id
00:00:01 --> browser 1 sends update with id 1 (it takes 10 seconds)
00:00:03 --> browser 2 sends update with id 1 (it takes 9 seconds)
browser 2's send request at 3rd second, still browser 1's update is going on. 
In this situation, browser 2's update should wait for 1's complete.

## Case 3 : Concurrent update different id
00:00:01 --> browser 1 sends update with id 1 (it takes 10 seconds)
00:00:01 --> browser 2 sends update with id 45 (it takes 9 seconds)
Browser 1 and 2 send update at same time but different IDs. so it doesn't matter which completes first.
Let it go as it is. The order of update doesn't matter.

## Browser sends update
In below example, Browser 1, 2 and 3 are calling `update()` at same time with same id.
One browser's update should finish first then only another one's update should start.

```
+------------+                                                                                   
|            |  {id: 1, data: ****}                                                        
| Browser 1  |---------------------------+                                                    
|            |                           |                                                        
+------------+                           |                                                        
                                         |                                                        
+------------+                           |    REST Service                                            
|            |                      +--------------------+                                       
| Browser 2  |                      |                    |                                       
|            |----------------------|   update(id, data) |                                       
+------------+ {id: 1, data: ****}  |                    |                                       
                                    +--------------------+                                       
                                         |                                                       
+------------+                           |                                                       
|            |                           |                                                       
| Browser 3  |  {id: 1, data: ****}      |                                                       
|            |---------------------------+                                                       
+------------+                                                                                   
```                                                          

# What you have to do?
You have to make changes in such a way that update should be executed one by one for same id. 
Execution order should not be matter for different IDs. 

You can make any change inside `update()`
Also you can add anything outside of that function also.
You should not change anything below line no 10.
