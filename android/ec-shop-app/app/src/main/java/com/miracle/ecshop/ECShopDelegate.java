package com.miracle.ecshop;

import android.os.Bundle;
import android.view.View;

import androidx.annotation.Nullable;

import com.miracle.core.delegates.ApplicationDelegate;

public class ECShopDelegate extends ApplicationDelegate {
    @Override
    public Object setLayout() {
        return R.layout.delegate_ecshop;
    }

    @Override
    public void onBindView(@Nullable Bundle savedInstanceState, View rootView) {
        super.onBindView(savedInstanceState, rootView);
    }
}
