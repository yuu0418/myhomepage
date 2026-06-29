graph TD
    Start([開始: forward_packet]) --> GetIP[宛先IPの取得<br>ルーティングテーブルの検索]
    GetIP --> Choice{宛先・ルートの判定}

    %% 条件1: マルチキャスト
    Choice -- 1. dest_ip == '224.0.0.5' --> MC_Loop[すべてのインタフェースでループ]
    MC_Loop --> MC_Log[ログ記録: forwarded]
    MC_Log --> MC_Rewrite[MACアドレスの書き換え<br>・送信元: 各リンクのMAC<br>・宛先: ARPより取得]
    MC_Rewrite --> MC_Enq[各リンクのキューに追加]
    MC_Enq --> End([終了])

    %% 条件2: ユニキャスト
    Choice -- 2. 特定の link が存在 --> UC_Log[ログ記録: forwarded]
    UC_Log --> UC_Rewrite[MACアドレスの書き換え<br>・送信元: 該当リンクのMAC<br>・宛先: ARPより取得]
    UC_Rewrite --> UC_Enq[該当リンクのキューに追加]
    UC_Enq --> End

    %% 条件3: デフォルトルート
    Choice -- 3. default_route が存在 --> DF_Log[ログ記録: forwarded via default route]
    DF_Log --> DF_Rewrite[MACアドレスの書き換え<br>・送信元: デフォルトルートのMAC<br>・宛先: ARPより取得]
    DF_Rewrite --> DF_Enq[デフォルトルートのキューに追加]
    DF_Enq --> End

    %% 条件4: ルートなし
    Choice -- 4. それ以外（ルートなし） --> DP_Log[ログ記録: dropped]
    DP_Log --> DP_Drop[パケットを破棄]
    DP_Drop --> End

    style Start fill:#f9f,stroke:#333,stroke-width:2px
    style End fill:#9f9,stroke:#333,stroke-width:2px
    style Choice fill:#ff9,stroke:#333,stroke-width:2px
    style DP_Drop fill:#f99,stroke:#333,stroke-width:2px
