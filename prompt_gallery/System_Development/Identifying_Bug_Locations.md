# 找出程式錯誤發生的位置

## 說明
這是一個適用於從程式設計初學者到有經驗者的提示詞，用於指出程式錯誤可能發生的位置。

這次以陣列越界存取為例，說明在程式設計中經常發生的錯誤，並提供實際的程式碼範例。

```plaintext
在下面的 C++ 程式碼中，哪裡可能會發生錯誤？

#include <iostream>

int main()
{
    int arr[3];
    
    for(int i=0; i<4; i++) {
        arr[i] = i+1;
    }
    
    for(auto x : arr) {
        std::cout << x << std::endl;
    }
    
    return 0;
}
```

```plaintext
在下面的 C++ 程式碼中，哪裡可能會發生錯誤？

#include <iostream>

int main()
{
    int arr[3];
    
    for(int i=0; i<4; i++) {
        arr[i] = i+1;
    }
    
    for(auto x : arr) {
        std::cout << x << std::endl;
    }
    
    return 0;
}
```