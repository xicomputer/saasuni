<template>
	<view>
		<!-- 导入骨架屏 -->

		<!-- parse <template is="skeleton" v-if="loading"/> -->
	<!-- 	<block name="skeleton">
			<view class="sk-container">
				<view class="headpo">
					<view class="head-shop-info-boxtop-box-bg3 1">
						<view class="me-fx-row me-fx-sb-c title-bar" style="height: 70px">
							<view class="me-fx-row header">
								<view class="header_Info me-fx-col">
									<view><text class="appName_info app-name sk-transparent sk-text-18-7500-230 sk-text" style="color: #000">完美美妆达人</text></view>
									<view class="tscl"><text class="btn_sales sk-transparent sk-text-18-7500-32 sk-text" style="font-size: 9px">访问：3132</text></view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="home-page bg_AllPage3 1" style="overflow-x: hidden">
					<view style="overflow-x: hidden; background-color: whitesmoke" class="bg_AllPage3 1">
						<view style="overflow-x: hidden; background: #fff">
							<view class="hoem-title"></view>
							<view class="home">
								<view class="video" style="width: 350px; height: 150px; margin: 0 auto; margin-bottom: 20px">
									<view
										:autoplay="true"
										style="width: 350px; height: 150px; margin: 0 auto"
										class="index1_img2 sk-transparent sk-text--Infinity-159 sk-text sk-image"
										:controls="true"
										:muted="true"
										:show-mute-btn="true"
										:show-play-btn="true"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/xsrm/video/d12019744b6749d695f568d70576dcde.mp4"
										:unit-id="true"
									>
										00:0900:26视频
									</view>
								</view>
								<view>
									<view class="column" id="navbar">
										<view style="width: 350px; margin: 0px auto; display: flex; align-items: center">
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column">
												<image :mode="true" style="width: 30px; height: 30px" class="sk-image"></image>
												<text style="font-size: 11px; margin-top: 5px; font-weight: 550" class="sk-transparent sk-text-18-7500-223 sk-text">粉丝群</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column">
												<image :mode="true" style="width: 30px; height: 30px" class="sk-image"></image>
												<text style="font-size: 11px; margin-top: 5px; font-weight: 550" class="sk-transparent sk-text-18-7500-905 sk-text">优惠劵</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column">
												<view is="pages/shopHome/components/coupon/coupon">
													<view data-url="/pages/shopHome/member/member" style="width: 45px; height: 45px; position: absolute; z-index: 9999; margin-left: -22px"></view>
												</view>
												<image :mode="true" style="width: 30px; height: 30px" class="sk-image"></image>
												<text style="font-size: 11px; margin-top: 5px; font-weight: 550" class="sk-transparent sk-text-18-7500-353 sk-text">会员专区</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column">
												<view is="pages/shopHome/components/activity/activity">
													<view data-url="/pages/shopHome/dynamic/dynamic" style="position: absolute; z-index: 9999; width: 45px; height: 45px; margin-left: -22px"></view>
												</view>
												<image :mode="true" style="width: 30px; height: 30px" class="sk-image"></image>
												<text style="font-size: 11px; margin-top: 5px; font-weight: 550" class="sk-transparent sk-text-18-7500-573 sk-text">商家推荐</text>
											</view>
											<view data-index="5" style="width: 20%; display: flex; align-items: center; flex-direction: column">
												<image :mode="true" style="width: 30px; height: 30px" class="sk-image"></image>
												<text style="font-size: 11px; margin-top: 5px; font-weight: 550" class="sk-transparent sk-text-18-7500-777 sk-text">抖音小店</text>
											</view>
										</view>
									</view>
								</view>
								<view></view>
								<view is="pages/shopHome/components/ToCity/ToCity">
									<view style="margin-top: 30px">
										<view class="ToCity--toCity ToCity--temp-box-31" style="margin-top: 30px; width: 350px; margin: 0 auto; background: #fff">
											<view class="ToCity--book" style="background-color: #fff; width: 100%">
												<view data-type="1" style="width: 100%; background: rgba(0, 0, 0, 0.25); height: 42px; border-radius: 5px 5px 0 0; position: relative">
													<image :mode="true" style="width: 36px; height: 36px; border-radius: 20%; margin-top: 15px; margin-left: 10px" class="sk-image"></image>
													<view style="position: absolute; top: 10px; left: 60px; color: white; font-size: 15px">
														<text class="sk-transparent sk-text-18-7500-605 sk-text">完美美妆达人</text>
													</view>
													<text
														style="
                                                            padding: 0.5px 3px;
                                                            color: white;
                                                            background: red;
                                                            font-size: 9px;
                                                            position: absolute;
                                                            top: 12px;
                                                            right: 0;
                                                            font-weight: 550;
                                                            border-radius: 4px;
                                                        "
														class="sk-transparent sk-text-18-7500-379 sk-text"
													>
														全国物流
													</text>
													<text
														style="
                                                            padding: 0.5px 3px;
                                                            color: white;
                                                            background: red;
                                                            font-size: 9px;
                                                            position: absolute;
                                                            bottom: -9px;
                                                            left: 60px;
                                                            font-weight: 550;
                                                            border-radius: 4px;
                                                        "
														class="sk-transparent sk-text-18-7500-309 sk-text"
													>
														7天无理由退货
													</text>
													<text
														style="
                                                            padding: 0.5px 3px;
                                                            color: white;
                                                            background: red;
                                                            font-size: 9px;
                                                            position: absolute;
                                                            bottom: -9px;
                                                            left: 140px;
                                                            font-weight: 550;
                                                            border-radius: 4px;
                                                        "
														class="sk-transparent sk-text-18-7500-153 sk-text"
													>
														质量保障
													</text>
												</view>
												<scroll-view class="ToCity--product1_list" :scroll-x="true" style="width: 100%; margin-top: 10px">
													<view class="ToCity--me-fx-row ToCity--me-fx-start-c">
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2195" data-type="1">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-768 sk-text"
																>
																	全国
																</text>
																judydoll橘朵液体眼影珠
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-180 sk-text">0.01</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2198" data-type="1">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-588 sk-text"
																>
																	全国
																</text>
																nycemakeup修容高光
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-145 sk-text">2.2</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2214" data-type="1">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-432 sk-text"
																>
																	全国
																</text>
																Dior迪奥烈艳蓝金唇膏口红
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-536 sk-text">35</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2886" data-type="1">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-170 sk-text"
																>
																	全国
																</text>
																测试口红001
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-opacity">1</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2194" data-type="1">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-572 sk-text"
																>
																	全国
																</text>
																juduo橘朵单色腮红
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-123 sk-text">2.18</text>
															</view>
														</view>
													</view>
												</scroll-view>
											</view>
											<view class="ToCity--book" style="background-color: #ffffff; width: 100%; margin-top: 10px">
												<view data-type="3" style="width: 100%; background: rgba(0, 0, 0, 0.25); height: 42px; border-radius: 5px 5px 0 0; position: relative">
													<image :mode="true" style="width: 36px; height: 36px; border-radius: 20%; margin-top: 15px; margin-left: 10px" class="sk-image"></image>
													<view style="position: absolute; top: 10px; left: 60px; color: white">
														<text class="sk-transparent sk-text-18-7500-772 sk-text">北辰三角洲内,凤凰天阶苑西北88米</text>
													</view>
													<text
														style="
                                                            padding: 0.5px 3px;
                                                            color: white;
                                                            background: red;
                                                            font-size: 9px;
                                                            position: absolute;
                                                            top: 12px;
                                                            right: 0;
                                                            font-weight: 550;
                                                            border-radius: 4px;
                                                        "
														class="sk-transparent sk-text-18-7500-559 sk-text"
													>
														门店团购
													</text>
													<text
														style="
                                                            padding: 0.5px 3px;
                                                            color: white;
                                                            background: red;
                                                            font-size: 9px;
                                                            position: absolute;
                                                            bottom: -8px;
                                                            left: 60px;
                                                            font-weight: 550;
                                                            border-radius: 4px;
                                                        "
														class="sk-transparent sk-text-18-7500-423 sk-text"
													>
														上门自取
													</text>
													<text
														style="
                                                            padding: 0.5px 3px;
                                                            color: white;
                                                            background: red;
                                                            font-size: 9px;
                                                            position: absolute;
                                                            bottom: -8px;
                                                            left: 115px;
                                                            font-weight: 550;
                                                            border-radius: 4px;
                                                        "
														class="sk-transparent sk-text-18-7500-658 sk-text"
													>
														进店消费
													</text>
												</view>
												<scroll-view class="ToCity--product1_list" :scroll-x="true" style="width: 100%; margin-top: 10px">
													<view class="ToCity--me-fx-row ToCity--me-fx-start-c">
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2196" data-type="3">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-740 sk-text"
																>
																	到店
																</text>
																哆可眼线胶笔
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-364 sk-text">1.38</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2211" data-type="3">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-652 sk-text"
																>
																	到店
																</text>
																麻辣八爪鱼
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-212 sk-text">0.1</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2193" data-type="3">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-440 sk-text"
																>
																	到店
																</text>
																JILL LEEN迷你九色眼影
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-214 sk-text">2.5</text>
															</view>
														</view>
														<view class="ToCity--me-fx-col ToCity--me-fx-sb-c ToCity--product_info" data-id="2199" data-type="3">
															<image class="ToCity--product_img sk-image"></image>
															<text class="ToCity--product_name ToCity--me-full-text ToCity--u-line-2 sk-transparent" style="font-weight: 550; font-size: 10px; height: 30px">
																<text
																	style="color: #fff; background: #ff0000; border-radius: 2px; font-size: 9px; padding: 0 2px"
																	class="sk-transparent sk-text-18-7500-571 sk-text"
																>
																	到店
																</text>
																unny眼线胶笔
															</text>
															<view class="ToCity--me-fx-row ToCity--price_info" style="justify-content: flex-start; color: #ff0021; font-weight: bold">
																<text class="ToCity--product_price sk-transparent sk-opacity">￥</text>
																<text class="ToCity--price sk-transparent sk-text-18-7500-715 sk-text">2.9</text>
															</view>
														</view>
													</view>
												</scroll-view>
											</view>
										</view>
									</view>
								</view>
								<view is="pages/shopHome/components/activity/activity">
									<view class="activity-activity--activity" style="margin: 0 auto; margin-top: 10px">
										<image class="activity-activity--alerts-Img sk-image" data-url="/pages/shopHome/dynamic/dynamic" mode="aspectFill"></image>
									</view>
								</view>
							</view>
							<view class="page_right_img me-fx-col"></view>
						</view>
					</view>
				</view>
			</view>
		</block>
 -->
		<!-- 顶部滚动切换 -->
		<!-- <view class="headpo {{isshowHead ? 'xpactive' :''}}" wx:if="{{nowTabbarText=='首页'}}">
  <view class='head-shop-info-box{{topBoxBg}}'>
    <view style="height:70px;" class='me-fx-row me-fx-sb-c {{nowTabbarText=="首页"?"title-bar":""}}'>
      <view class="me-fx-row header">
        <view class="header_Info me-fx-col">
          <view>
            <text style="color: #000;" class="appName_info app-name">{{appName}}</text>
          </view>
          <view class="tscl">
            <text class="btn_sales">访问：{{accessCount}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</view> -->
		<!-- <block v-else> -->
		<block >
			<block v-if="isToStore && mainBusinessModel == 3">
				<!-- 头 -->
				<view :class="'headpo ' + (isshowHead ? 'xpactive' : '')" v-if="nowTabbarText == '首页'" style="background-color: #1b78f4">
					<view :class="'head-shop-info-box' + topBoxBg">
						<view style="height: 70px" :class="'me-fx-row me-fx-sb-c ' + (nowTabbarText == '首页' ? 'title-bar' : '')">
							<view class="me-fx-row header">
								<view class="header_Info me-fx-col">
									<view>
										<text style="color: rgb(255, 255, 255)" class="appName_info app-name">{{ appName }}</text>
									</view>
									<view class="tscl">
										<text class="btn_sales" style="font-size: 18rpx">访问：{{ accessCount }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 主体 -->
				<view
					:class="'home-page   ' + (currentIndex == '全国发货' || currentIndex == '秒杀专区' ? pageBg : '') + ' ' + (nowTabbarText == '首页' ? '' : 'bg_white')"
					style="overflow-x: hidden"
				>
					<view :class="pageBg" @touchstart="touchMove" @touchend="touchEnd" style="overflow-x: hidden; background-color: whitesmoke">
						<view v-if="nowTabbarText == '首页' && tempId > 4">
							<!-- 全国发货 -->
							<view :class="'bg_body' + tempId" v-if="nowMenuItem.code == 'LOGISTICS'">
								<top-banner :settingImg="settingImg" :banners="markerInfo.recommendList" :appName="appName" :temp-id="tempId"></top-banner>
								<product :orderSwitch="orderSwitch" :marchantId="marchantId" :product-list="goodsList" :temp-id="tempId" :isWuliu="isWuliu"></product>
							</view>

							<!-- 拼团专区 -->
							<view :class="'bg_body' + tempId" v-if="tempId > 4 && nowMenuItem.code == 'TTPT'">
								<activity-product :orderSwitch="orderSwitch" :marchantId="marchantId" :temp-id="tempId" template-tag="TTPT" :countdown="true"></activity-product>
							</view>

							<!-- 推荐返利 -->
							<view style="background-color: #000" v-if="tempId > 4 && nowMenuItem.code == 'TJFL'"><tjfl-classify></tjfl-classify></view>

							<!-- 门店团购 -->
							<view style="background: #f9f9f9; padding-top: 40rpx" v-if="nowMenuItem.code == 'RESERVE'">
								<to-city
									:isToCity="isToCity"
									:address="markerInfo.address"
									msg="本店可预定商品，用户需到店取货或消费"
									:isToStore="isToStore"
									:temp-id="tempId"
									:marchantId="marchantId"
									:shop-list="toShoplist2"
									shopType="book"
									:activityInfo="userInfo"
								></to-city>
							</view>

							<!-- 同城配送 -->

							<view style="background: #f9f9f9; padding-top: 40rpx" v-if="nowMenuItem.code == 'DELIVERY'">
								<to-city
									:isToCity="isToCity"
									:address="markerInfo.address"
									msg="本店可同城配送商品，用户下单同城可配送"
									:isToStore="isToStore"
									:temp-id="tempId"
									:marchantId="marchantId"
									:shop-list="toShoplist"
									shopType="city"
									:activityInfo="userInfo"
								></to-city>
							</view>

							<!-- 秒杀专区 -->
							<view v-if="tempId > 4 && nowMenuItem.code == 'JSMS'">
								<activity-product
									:orderSwitch="orderSwitch"
									:marchantId="marchantId"
									:product-list="goodsList"
									:countdown="true"
									:temp-id="tempId"
									template-tag="JSMS"
								></activity-product>
							</view>

							<!-- 会员专区 -->
							<view v-if="nowMenuItem.code == 'MEMBER'" style="margin-top: 5rpx">
								<member :detailData="memberInfo" :memberGoodsList="memberGoodsList" :marchantId="marchantId"></member>
							</view>

							<!-- 商家文化 -->
							<view v-if="nowMenuItem.code == 'CULTURE'" style="margin-top: 40rpx"><Article :ArticleList="ArticleList" :marchantId="marchantId"></Article></view>

							<view class="foot"></view>
						</view>

						<!-- 首页 -->
						<view v-else-if="nowTabbarText == '首页' && tempId < 5" style="overflow-x: hidden; background: #f7f7f7">
							<view class="hoem-title"></view>

							<!-- 新版首页开始22.5.26 -->
							<view class="home">
								<!-- 视频 -->
								<view class="video" v-if="settingImg.top.fileurl.length > 1">
									<video
										:src="settingImg.top.fileurl[1]"
										mode="aspectFit"
										class="index1_img2"
										:loop="true"
										:autoplay="true"
										:muted="false"
										:controls="false"
										:show-mute-btn="false"
										:show-play-btn="false"
										style="width: 750rpx; height: 425rpx; border-radius: 0"
									>
										视频
									</video>
								</view>

								<!-- 描述部分 -->
								<view style="position: relative; top: 0rpx; z-index: 1">
									<view style="width: 700rpx; border-radius: 20rpx; background-color: rgb(255, 255, 255); margin: 0 auto; margin-top: -80rpx">
										<view>
											<view style="position: absolute; top: -60rpx; right: 40rpx; display: flex; align-items: center">
												<!-- <view style="width:700rpx;margin:0rpx auto;display:flex;align-items:center;"> -->
												<!-- <view style="display:flex;align-items:center;flex-direction:column;margin-left: 10rpx;" wx:if="{{codeInfo[0]}}" bindtap="goimg">
                    <image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image>
                  </view>
                  <view style="display:flex;align-items:center;flex-direction:column;margin-left: 10rpx;" wx:else bindtap="jumpDefault">
                    <image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image>
                  </view> -->
												<view
													style="display: flex; align-items: center; flex-direction: column; margin-left: 15rpx"
													v-if="addcouponList1[0] || addcouponList2[0] || addcouponList3[0]"
													@tap="goCoupons"
												>
													<image style="width: 80rpx; height: 80rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/992.png" mode></image>
												</view>
												<view style="display: flex; align-items: center; flex-direction: column; margin-left: 15rpx" v-else @tap="jumpDefault">
													<image style="width: 80rpx; height: 80rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/992.png" mode></image>
												</view>
												<view style="display: flex; align-items: center; flex-direction: column; margin-left: 15rpx" @tap="jumptuiguan">
													<image style="width: 80rpx; height: 80rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/995.png" mode></image>
												</view>
												<!-- <view style="display:flex;align-items:center;flex-direction:column;margin-left: 10rpx;"  >       
                    <coupon marchantId="{{marchantId}}" mainBusinessModel="{{mainBusinessModel}}"></coupon>
                    <image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/huiyuanhuodong.gif" mode></image>
                  </view> -->

												<!-- <view style="display:flex;align-items:center;flex-direction:column;margin-left: 10rpx;"  wx:if="{{commentList2s.length > 0}}">
                    <activity-list  wx:if="{{commentList2s.length > 0}}" shopList='{{shopList}}' commentList="{{commentList2s}}" marchantId="{{marchantId}}" activityInfo="{{userInfo}}" hotelList='{{hotelList}}' temp-id='{{50}}'>
                  </activity-list>
                    <image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon55.png" mode></image>
                  </view>
                  <view style="display:flex;align-items:center;flex-direction:column;margin-left: 10rpx;"  wx:else bindtap="jumpDefault">
                    <image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon55.png" mode></image>
                  </view> -->
												<view style="display: flex; align-items: center; flex-direction: column; margin-left: 15rpx" v-if="businessInfo.notify[0]" @tap="isShowTiktok">
													<image style="width: 80rpx; height: 80rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/996.png" mode></image>
												</view>
												<view style="display: flex; align-items: center; flex-direction: column; margin-left: 15rpx" v-else @tap="jumpDefault" data-index="5">
													<image style="width: 80rpx; height: 80rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/996.png" mode></image>
												</view>

												<view style="display: flex; align-items: center; flex-direction: column; margin-left: 15rpx" @tap="jumpPayMoney">
													<image style="width: 80rpx; height: 80rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/993.png" mode></image>
												</view>
												<view style="display: flex; align-items: center; flex-direction: column; margin-left: 10rpx" @tap="jumpTel">
													<image style="width: 95rpx; height: 95rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/tel.png" mode></image>
												</view>
											</view>
											<view>
												<view style="position: absolute; right: 60rpx; top: 130rpx">
													<view
														style="
                                                            padding: 5rpx 20rpx;
                                                            align-items: center;
                                                            display: flex;
                                                            font-size: 22rpx;
                                                            border-radius: 5rpx;
                                                            margin-right: 10rpx;
                                                            background-color: #1b78f4;
                                                            color: #fff;
                                                            justify-content: space-around;
                                                        "
														@tap="showDingYue"
														v-if="isShowSub"
													>
														<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/999.png" style="width: 30rpx; height: 40rpx"></image>
														<view style="margin-left: 15rpx">订阅</view>
													</view>
												</view>
											</view>
											<view style="padding: 20rpx; padding-bottom: 0">
												<image style="width: 60rpx; height: 60rpx" :src="businessInfo.headImage" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550; margin-left: 20rpx">{{ businessInfo.nickName }}</text>
											</view>
											<view style="padding: 5rpx 20rpx; display: flex; align-items: center">
												<view
													style="
                                                        padding: 1rpx 10rpx;
                                                        border: 1rpx solid #1b78f4;
                                                        color: #1b78f4;
                                                        display: inline-block;
                                                        font-size: 16rpx;
                                                        border-radius: 20rpx;
                                                        margin-right: 10rpx;
                                                    "
													v-for="(item, index) in businessInfo.labelsList"
													:key="index"
												>
													{{ item }}
												</view>
											</view>
											<view style="padding: 5rpx 20rpx; display: flex; align-items: center">
												<view
													style="
                                                        padding: 1rpx 10rpx;
                                                        align-items: center;
                                                        color: #1b78f4;
                                                        display: flex;
                                                        font-size: 16rpx;
                                                        border-radius: 20rpx;
                                                        margin-right: 10rpx;
                                                        background-color: #d9e8fd;
                                                    "
												>
													<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/666.png" style="width: 20rpx; height: 20rpx"></image>
													商家已认证
												</view>
												<view
													style="
                                                        padding: 1rpx 10rpx;
                                                        color: #1b78f4;
                                                        display: flex;
                                                        font-size: 16rpx;
                                                        border-radius: 20rpx;
                                                        margin-right: 10rpx;
                                                        background-color: #d9e8fd;
                                                        align-items: center;
                                                    "
												>
													<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/777.png" style="width: 20rpx; height: 20rpx"></image>
													服务
												</view>
												<view
													style="
                                                        padding: 1rpx 10rpx;
                                                        align-items: center;
                                                        color: #1b78f4;
                                                        display: flex;
                                                        font-size: 16rpx;
                                                        border-radius: 20rpx;
                                                        margin-right: 10rpx;
                                                        background-color: #d9e8fd;
                                                    "
												>
													<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/888.png" style="width: 20rpx; height: 20rpx"></image>
													访问人数{{ accessCount }}
												</view>
											</view>
											<view style="padding: 5rpx 20rpx; display: flex; flex-direction: column; font-weight: 700">
												<view style="display: flex; margin-top: 15rpx">
													<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/111.png" style="width: 28rpx; height: 28rpx; margin-top: 6rpx"></image>
													<text style="font-size: 24rpx; color: #333333; margin-left: 10rpx; flex: 1">营业时间: {{ businessInfo.openingTime || '09:00' }}</text>
												</view>
												<!-- <view  style="display: flex;margin-top: 15rpx;" wx:if="{{businessInfo.telephone}}">
               <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/telephone.png" style="width:28rpx;height:28rpx;margin-top: 6rpx;"></image>
               <text style="font-size: 24rpx;color: #333333;margin-left: 10rpx;flex: 1;">联系方式: {{businessInfo.telephone}}</text>
              </view> -->
												<view style="display: flex; margin-top: 15rpx" v-if="businessInfo.entirelyAddress">
													<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/222.png" style="width: 28rpx; height: 28rpx; margin-top: 6rpx"></image>
													<text style="font-size: 24rpx; color: #333333; margin-left: 10rpx; flex: 1">{{ businessInfo.entirelyAddress }}</text>
												</view>
												<view style="display: flex; margin-top: 15rpx" v-if="businessInfo.personalDetails">
													<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/333.png" style="width: 28rpx; height: 28rpx; margin-top: 6rpx"></image>
													<text style="font-size: 24rpx; color: #333333; margin-left: 10rpx; flex: 1">{{ businessInfo.personalDetails }}</text>
												</view>
											</view>
										</view>
									</view>
								</view>
								<!-- 中间分类图片 -->
								<!-- <view style="margin-top: 20rpx;">
        <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/444.png" style="width: 100%;height: 130rpx;border-radius: 0;" mode="aspectFill"></image>
        <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/555.png" style="width: 100%;height: 130rpx;margin-top: 20rpx;border-radius: 0;" mode="aspectFill"></image>
      </view> -->
								<!-- <view >
  <view class="column {{isFixedTop ?'fixed':''}}" id="navbar"  style="padding-top:{{settingImg.top.fileurl.length > 1?'10rpx':'40rpx'}}">
		<view style="width:700rpx;margin:0rpx auto;display:flex;align-items:center;">
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:if="{{codeInfo[0]}}" bindtap="goimg">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">粉丝群</text>
			</view>
      <view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:else bindtap="jumpDefault">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">粉丝群</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:if="{{addcouponList1[0] || addcouponList2[0] || addcouponList3[0]}}" bindtap="goCoupons">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/mianfeilipin.gif" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">优惠劵</text>
			</view>
      <view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:else bindtap="jumpDefault">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/mianfeilipin.gif" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">优惠劵</text>
			</view>
      <view style="width:20%;display:flex;align-items:center;flex-direction:column;"  bindtap="jumptuiguan">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/tuiguan.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">推广中心</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;"  >       
        <coupon marchantId="{{marchantId}}" mainBusinessModel="{{mainBusinessModel}}"></coupon>
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/huiyuanhuodong.gif" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">会员专区</text>
			</view>

			<view style="width:20%;display:flex;align-items:center;flex-direction:column;"  wx:if="{{commentList2s.length > 0}}">
        <activity-list  wx:if="{{commentList2s.length > 0}}" shopList='{{shopList}}' commentList="{{commentList2s}}" marchantId="{{marchantId}}" activityInfo="{{userInfo}}" hotelList='{{hotelList}}' temp-id='{{50}}'>
      </activity-list>
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon55.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">商家推荐</text>
			</view>
      <view style="width:20%;display:flex;align-items:center;flex-direction:column;"  wx:else bindtap="jumpDefault">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon55.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">商家推荐</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:if="{{businessInfo.notify[0]}}" bindtap="isShowTiktok">
				<image  style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon66.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">抖音小店</text>
			</view>
      <view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:else bindtap="jumpDefault" data-index="5">
				<image  style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon66.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">抖音小店</text>
			</view>
		</view>
	</view>
  <view class="column "  wx:if="{{isFixedTop}}"></view>
</view> -->

								<!-- <view>
		<view
			style="width:700rpx;margin:0 auto;background:#fff;padding:20rpx;border-radius:20rpx;" wx:if="{{JSMSactivity.length > 0}}">
			<view style="display:flex;align-items: center;justify-content:space-between;">
				<image style="width:128rpx;height:30rpx;border-radius:0;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/miaosha.png" mode></image>
				<text style="font-size:22rpx;font-weight: 550;"  bindtap='jumpMore' data-activityTag="{{JSMSactivity[0].templateTag}}">正在进行</text>
			</view>
			<view style="width:100%;display:flex;align-items:center;margin-top:20rpx;"  
      
      bindtap='jumpMore' data-activityTag="{{JSMSactivity[0].templateTag}}">
				<block wx:for="{{JSMSactivity}}" wx:for-item="item" wx:for-index="index"  wx:if="{{index < 4}}">
					<view style="display:flex;flex-direction:column;align-items:left;margin-right:12rpx;">
						<image style="width:160rpx;height:160rpx;" src="{{item.imageUrl}}" mode></image>
            <text	style="width:160rpx;height: 60rpx;font-size: 20rpx;font-weight: 550;" class="u-line-2">{{item.commodityName}}</text>
            <text	style="color:red;font-size:20rpx;margin-top:10rpx;font-weight: 550;">￥{{item.showPrice}}</text>
            <text	style="color:#999999;text-decoration:line-through;font-size:20rpx;margin-top:10rpx;">￥{{item.price}}</text>
					</view>
				</block>
			</view>
		</view>
	</view> -->

								<!-- 中间部分开始 -->
								<!-- <to-city isToCity="{{isToCity}}" isWuliu='{{isWuliu}}' isToStore="{{isToStore}}" address="{{markerInfo.address}}" msg="本店可预定商品，用户需到店取货或消费" tempId='{{tempId}}' marchantId='{{marchantId}}' logisticsList='{{logisticsList}}' shopList2="{{toShoplist2}}" shop-list="{{toShoplist}}" shopType="book" activityInfo="{{userInfo}}" main-order-type='{{mainBusinessModel}}' headImage="{{businessInfo.headImage}}" nickName="{{markerInfo.nickName}}">
      </to-city> -->

								<!-- <activity-list  wx:if="{{commentList2s.length > 0}}" shopList='{{shopList}}' commentList="{{commentList2s}}" marchantId="{{marchantId}}" activityInfo="{{userInfo}}" hotelList='{{hotelList}}' temp-id='{{tempId}}'>
      </activity-list>
  <view style="display: flex;align-items: center;width: 300rpx;margin: 0 auto;margin-top: 60rpx;">
    <text style="color: #999;">——</text>
  <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/jinrituijian.png" style="width: 200rpx;height:50rpx;" mode="aspectFill"></image>
  <text style="color: #999;">——</text>
  </view> -->

								<!-- <product wx:if='{{marchantId}}' orderSwitch='{{orderSwitch}}' marchantId='{{marchantId}}' product-list='{{mainGoodsList}}' temp-id='{{tempId}}' isWuliu='{{isWuliu}}' isToCity="{{isToCity}}" isToStore="{{isToStore}}" main-order-type='{{mainBusinessModel}}'>
  </product> -->
								<view
									style="
                                        width: 700rpx;
                                        height: 64rpx;
                                        margin: 0 auto;
                                        border-radius: 20rpx 20rpx 0 0;
                                        position: relative;
                                        background-color: #d9e8fd;
                                        margin-top: 30rpx;
                                        color: #1b78f4;
                                        font-size: 24rpx;
                                        line-height: 64rpx;
                                        text-align: center;
                                        background-image: url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/5bd814dad65d8.jpg);
                                        background-position: 20% 70%;
                                    "
									class="u-line-1"
								>
									<!-- <view class="marquee_box"  wx:for='{{businessInfo.notify}}'>
      <view class="marquee_text" wx:key='index' style="transform: translateX(-{{marqueeDistance}}rpx)">
        <text >{{item.content}}</text>
      </view>
    </view> -->
									<tomap :longitude="businessInfo.longitude" :address="businessInfo.address" :latitude="businessInfo.latitude"></tomap>

									<!-- <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/5bd814dad65d8.jpg" mode="widthFix"></image> -->
								</view>

								<!-- <map id="map" longitude="{{businessInfo.longitude}}" address="{{businessInfo.address}}" latitude="{{businessInfo.latitude}}"  scale="18"  style="width: 100%; height: 300px;background:#000 ;" bindtap="clickMap"></map> -->
								<goods-recommend
									v-if="mainGoodsList.length !== 0"
									:orderSwitch="orderSwitch"
									@relogin="reLogin"
									@myManager="changeTab"
									:marchantId="marchantId"
									:mainGoodsList="mainGoodsList"
									:temp-id="6"
									:main-order-type="mainBusinessModel"
								></goods-recommend>
								<!-- 秒杀 -->
								<view>
									<view style="width: 700rpx; margin: 0 auto; background: #fff; padding: 20rpx; border-radius: 20rpx" v-if="JSMSactivity.length > 0">
										<view style="display: flex; align-items: center; justify-content: space-between">
											<image
												style="width: 128rpx; height: 30rpx; border-radius: 0"
												src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/miaosha.png"
												mode
											></image>
											<text style="font-size: 22rpx; font-weight: 550" @tap="jumpMore" :data-activityTag="JSMSactivity[0].templateTag">正在进行</text>
										</view>
										<view style="width: 100%; display: flex; align-items: center; margin-top: 20rpx" @tap="jumpMore" :data-activityTag="JSMSactivity[0].templateTag">
											<block v-if="index < 4" v-for="(item, index) in JSMSactivity" :key="index">
												<view style="display: flex; flex-direction: column; align-items: left; margin-right: 12rpx">
													<image style="width: 160rpx; height: 160rpx" :src="item.imageUrl" mode></image>
													<text style="width: 160rpx; height: 60rpx; font-size: 20rpx; font-weight: 550" class="u-line-2">{{ item.commodityName }}</text>
													<text style="color: red; font-size: 20rpx; margin-top: 10rpx; font-weight: 550">￥{{ item.showPrice }}</text>
													<text style="color: #999999; text-decoration: line-through; font-size: 20rpx; margin-top: 10rpx">￥{{ item.price }}</text>
												</view>
											</block>
										</view>
									</view>
								</view>
								<!-- 中间部分开始 -->
								<to-city
									:isToCity="isToCity"
									:isWuliu="isWuliu"
									:isToStore="isToStore"
									:address="markerInfo.address"
									msg="本店可预定商品，用户需到店取货或消费"
									:tempId="tempId"
									:marchantId="marchantId"
									:logisticsList="logisticsList"
									:shopList2="toShoplist2"
									:shop-list="toShoplist"
									shopType="book"
									:activityInfo="userInfo"
									:main-order-type="mainBusinessModel"
									:headImage="businessInfo.headImage"
									:nickName="markerInfo.nickName"
								></to-city>
								<!-- 中间部分结束 -->
								<view>
									<view style="width: 100%; margin: 20rpx auto; background-color: #fff">
										<view style="padding: 20rpx; color: #1b78f4; font-weight: bold">设备</view>
										<view style="width: 710rpx; margin: 0 auto; display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap">
											<view style="display: flex; align-items: center; width: 25%; justify-content: center">
												<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/bbb.png" style="width: 25rpx; height: 25rpx"></image>
												<text style="font-size: 24rpx; margin-left: 10rpx">无线上网</text>
											</view>
											<view style="display: flex; align-items: center; width: 25%; justify-content: center">
												<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/ccc.png" style="width: 25rpx; height: 25rpx"></image>
												<text style="font-size: 24rpx; margin-left: 10rpx">有停车场</text>
											</view>
											<view style="display: flex; align-items: center; width: 25%; justify-content: center">
												<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/ddd.png" style="width: 25rpx; height: 25rpx"></image>
												<text style="font-size: 24rpx; margin-left: 10rpx">交通便利</text>
											</view>
											<view style="display: flex; align-items: center; width: 25%; justify-content: center">
												<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/eee.png" style="width: 25rpx; height: 25rpx"></image>
												<text style="font-size: 24rpx; margin-left: 10rpx">服务周到</text>
											</view>
											<view style="display: flex; align-items: center; width: 25%; justify-content: center">
												<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/fff.png" style="width: 25rpx; height: 25rpx"></image>
												<text style="font-size: 24rpx; margin-left: 10rpx">质量保障</text>
											</view>
										</view>
										<view style="height: 20rpx; width: 100%"></view>
									</view>
								</view>

								<!-- <view>
    <view style="width: 100%;margin:20rpx auto;background-color: #fff;">
      <view style="padding: 20rpx;color: #1B78F4;font-weight: bold;">门店简介</view>
      <view style="width: 710rpx;margin: 0 auto;color: #101010;font-size: 24rpx;text-indent : 20px; ">
        {{businessInfo.personalDetails}}
      </view>
      <view style="height: 20rpx;width: 100%;"></view>
    </view>
  </view> -->

								<!-- <view>
  <view style="width: 100%;margin:20rpx auto;background-color: #fff;">
      <view style="padding: 20rpx;color: #1B78F4;font-weight: bold;">服务之星</view>
       <scroll-view scroll-x='true' class="product1_list"  style="width: 100%;margin-top: 20rpx;">
                <view class="me-fx-row me-fx-start-c">
                    <block wx:for="{{8}}" wx:key="index">
                        <view class="me-fx-col me-fx-sb-c product_info" style=" margin-right: 20rpx;border-radius: 10rpx;background-color: #fff;" data-id="{{item.commodityId}}" data-type="2" bindtap="jumpGoodsDetail">
                            <image style="width: 132rpx;height: 132rpx;border-radius: 10rpx 10rpx 0 0 ;" src='https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/dealer/0008c77245274eba80e5247b35ec443b.jpg'></image>
                            <view class="u-line-2" style="font-weight: 550;font-size: 24rpx;text-align: center;width: 100%;">
                              冯敏
                            </view>
                        </view>
                    </block>
                </view>
            </scroll-view>
      <view style="height: 20rpx;width: 100%;"></view>
    </view>
  </view> -->

								<view>
									<view style="width: 100%; margin: 20rpx auto; background-color: #fff">
										<view style="padding: 20rpx; color: #1b78f4; font-weight: bold">文化</view>
										<view class="slogan-container">
											<!-- 上半部分 -->
											<!-- 下半部分 -->
											<view class="single" @tap="toWebViewPage" :data-link="item.linkurl" v-for="(item, index) in ArticleList" :key="index">
												<image :src="item.articlecover" mode="aspectFill"></image>

												<text class="line-clamp2" style="font-weight: 700">{{ item.articletitle }}</text>
											</view>
										</view>
										<view style="height: 20rpx; width: 100%"></view>
									</view>
								</view>
							</view>

							<view class="coupon-window-bgc" :style="'display:' + (isDiscount ? 'flex' : 'none')" @touchmove.stop.prevent="trueFun">
								<view class="coupon-window">
									<scroll-view @tap="a" :scroll-y="true" class="coupon-content-container">
										<view class="coupon-content-single" v-for="(item, index) in saleCanList" :key="index">
											<view class="price">
												<text>￥</text>
												<text>{{ item.deduct }}</text>
											</view>

											<view class="text">
												<text>满 {{ item.confine }} 可用</text>
												<text>{{ item.startTime }}-{{ item.endTime }}</text>
											</view>

											<image
												src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2FGroup%202999%402x.png"
												mode="aspectFill"
											></image>
										</view>
									</scroll-view>
									<image
										class="accept"
										@tap="receiveSale"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2F%E5%BC%80%E5%BF%83%E6%94%B6%E4%B8%8B.png"
									></image>
									<!-- <image class="accept" bindtap="jumpVolume" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2F%E5%BC%80%E5%BF%83%E6%94%B6%E4%B8%8B.png"></image> -->
									<image
										class="close"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png"
										@tap="closeSale"
									></image>
								</view>
							</view>
							<!-- 抖音 -->
							<view>
								<view class="tiktok-window-bgc" :style="'display:' + (isTiktok ? 'flex' : 'none')">
									<view class="tiktok-cont">
										<image
											class="tiktok-bgc"
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FGroup%201624%402x.png"
										></image>
										<text>复制口令 访问抖音小店</text>
										<image
											class="copy"
											@tap="copyTiktok"
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FGroup%203001%402x.png"
										></image>
										<image
											class="close-tiktok"
											@tap="closeTiktok"
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png"
										></image>
									</view>
								</view>
							</view>

							<!-- banner -->
							<top-banner
								:settingImg="settingImg"
								@myManager="changeTab"
								:userInfo="userInfo"
								:banners="mainGoodsList"
								:appName="appName"
								:temp-id="tempId"
								:main-order-type="mainBusinessModel"
								:mainBanner="mainBanner"
								:addcoupon-list="addcouponList"
								:jifen-num="jifenNum"
							></top-banner>

							<!-- 签到有惊喜 -->
							<view class="signIn" @tap="toSignActivity" v-if="isOpenSignIn == 1">
								<image
									src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%AD%BE%E5%88%B0%E5%85%A5%E5%8F%A3.gif"
									mode="widthFix"
								></image>
							</view>
							<!-- 下面是首次进入提示的签到弹窗 -->
							<view class="signIn-window-bgc" v-if="isOpenSignIn == 1" :style="'display:' + (isShowSignInPopup ? 'flex' : 'none')">
								<view class="signIn-cont">
									<image
										class="signIn-bgc"
										@tap="toSignActivity"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E9%A6%96%E9%A1%B5%E7%AD%BE%E5%88%B0%E5%BC%B9%E7%AA%97.png"
										mode="widthFix"
									></image>

									<view class="jumpToSignIn" @tap="toSignActivity">
										<text>马上领商品</text>
										<image
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E7%AD%BE%E5%88%B0h5%2F%E7%AD%BE%E5%88%B0_%E5%88%86%E4%BA%AB%E6%8C%89%E9%92%AE%E5%BA%95%E5%9B%BE.png"
											mode="widthFix"
										></image>
									</view>
									<image
										class="close-signIn"
										@tap="closeSignInPopup"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png"
									></image>
								</view>
							</view>

							<view :class="'support bgF8 support2 ' + ('page-foot' + tempId)">
								<image style="width: 182rpx; height: 30rpx" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/dibutab.png"></image>
							</view>
							<view class="foot"></view>
							<view class="page_right_img me-fx-col"></view>
						</view>

						<!-- 我的 -->
						<view v-if="nowTabbarText === '我的'">
							<my
								:orderSwitch="orderSwitch"
								:userInfo="userInfo"
								:orderNum="orderNum"
								:cityOrderNum="cityOrderNum"
								:activityInfo="userInfo"
								:toStoreOrderNum="toStoreOrderNum"
								:noticeNum="noticeNum"
								:toolsListNums="toolsListNums"
								:marchantId="marchantId"
								@pagesTo="pagesTo($event, { tagId: 'myInfos' })"
								:CouponsNum="CouponsNum"
								@toDetail="toDetail($event, { tagId: 'myInfos' })"
								:jifenNum="jifenNum"
								:isDistribution="markerInfo.isDistribution"
								:isWuliu="isWuliu"
								@reload="reload($event, { tagId: 'myInfos' })"
								:mainBusinessModel="mainBusinessModel"
								:isToCity="isToCity"
								:isToStore="isToStore"
								v-if="loadedList['我的']"
								:list="noticeContent"
								:signData="signData"
								:codeInfo="codeInfo"
								id="myInfos"
							></my>
							<!-- <view class="support bgF8 support2">-<text>信书技术支持</text>-</view> -->
							<view class="support bgF8 support2">
								<image style="width: 182rpx; height: 30rpx" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/dibutab.png"></image>
							</view>
							<view class="foot bgF8"></view>
						</view>

						<!-- 分类 -->
						<view v-if="nowTabbarText == '商品'">
							<view :style="'height:' + (statusBarHeight + menuButtonHeight) + 'px'"></view>
							<view class="home-top-container bgFFF">
								<view :style="'height:' + statusBarHeight + 'px'"></view>
								<view class="me-fx-row me-fx-start-c font-cc" :style="'height:' + menuButtonHeight + 'px'"><view class="appName">商品</view></view>
							</view>
							<view>
								<category-pages id="classify" v-if="marchantId != -1" :marchantId="marchantId" :temp-id="tempId" :main-order-type="mainBusinessModel">
									addcouponList="{{ addcouponList }}"
								</category-pages>
							</view>
						</view>
						<!-- 商家文化 -->
						<view v-if="nowTabbarText == '商家文化'" style="background-color: #f7f7f7">
							<view :style="'height:' + (statusBarHeight + menuButtonHeight) + 'px'"></view>
							<view class="home-top-container bgFFF">
								<view :style="'height:' + statusBarHeight + 'px'"></view>
								<view class="me-fx-row me-fx-start-c font-cc" :style="'height:' + menuButtonHeight + 'px'"><view class="appName">故事</view></view>
							</view>
							<!-- 商家文化 -->
							<shops-slogan :marchantId="marchantId" :ArticleList="ArticleList" :settingImg="settingImg" :mainBusinessModel="mainBusinessModel"></shops-slogan>
						</view>
						<!-- 购物车 -->
						<view v-if="nowTabbarText == '购物车'" style="background-color: #f7f7f7">
							<view :style="'height:' + (statusBarHeight + menuButtonHeight) + 'px'"></view>
							<view class="home-top-container bgFFF">
								<view :style="'height:' + statusBarHeight + 'px'"></view>
								<view class="me-fx-row me-fx-start-c font-cc" :style="'height:' + menuButtonHeight + 'px'"><view class="appName">购物车</view></view>
							</view>
							<shop-cart v-if="loadedList['购物车']" :main-order-type="mainBusinessModel" :marchantId="marchantId" :shopCartlist="shopCartlist"></shop-cart>
						</view>
						<view v-if="nowTabbarText == '购物车'" style="background-color: #f7f7f7"></view>
						<!-- 底部tabbar栏 -->
						<tabbar :tab-list="tabList" @myManager="changeTab" :now-tabbar-text="nowTabbarText" :marker-info="markerInfo"></tabbar>
					</view>
				</view>
			</block>
			<block v-else>
				<view :class="'headpo ' + (isshowHead ? 'xpactive' : '')" v-if="nowTabbarText == '首页'">
					<view :class="'head-shop-info-box' + topBoxBg">
						<view style="height: 70px" :class="'me-fx-row me-fx-sb-c ' + (nowTabbarText == '首页' ? 'title-bar' : '')">
							<view class="me-fx-row header">
								<view class="header_Info me-fx-col">
									<view>
										<text style="color: #000" class="appName_info app-name">{{ appName }}</text>
									</view>
									<view class="tscl">
										<text class="btn_sales" style="font-size: 18rpx">访问：{{ accessCount }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view
					:class="'home-page   ' + (currentIndex == '全国发货' || currentIndex == '秒杀专区' ? pageBg : '') + ' ' + (nowTabbarText == '首页' ? '' : 'bg_white')"
					style="overflow-x: hidden"
				>
					<view :class="pageBg" @touchstart="touchMove" @touchend="touchEnd" style="overflow-x: hidden; background-color: whitesmoke">
						<view v-if="nowTabbarText == '首页' && tempId > 4">
							<!-- 头部切换导航 -->
							<!-- <view  style="height:90rpx;">
        <view  class="Index_Item_info {{!settingImg.hasMiddle?pageBg:''}}"
          style="top:{{statusBarHeight+menuButtonHeight}}px"
        >
          <scroll-view scroll-x='true' class="product1_list">
            <view class="me-fx-row me-fx-start-c">
                <view class="List3_title {{'text-color'+tempId}}  me-fx-col me-fx-sb-c {{currentIndex == item.name ?'cur':''}}" wx:for="{{topMenuList}}" wx:key="index">
                    <view bindtap="titleClick" data-item='{{item}}' > {{item.name}}</view>
                    <view class='findIndex {{"cur-temp"+tempId}}'></view>
                </view>
            </view>
          </scroll-view>
        </view>
      </view> -->

							<!-- 全国发货 -->
							<view :class="'bg_body' + tempId" v-if="nowMenuItem.code == 'LOGISTICS'">
								<top-banner :settingImg="settingImg" :banners="markerInfo.recommendList" :appName="appName" :temp-id="tempId"></top-banner>
								<product :orderSwitch="orderSwitch" :marchantId="marchantId" :product-list="goodsList" :temp-id="tempId" :isWuliu="isWuliu"></product>
							</view>

							<!-- 拼团专区 -->
							<view :class="'bg_body' + tempId" v-if="tempId > 4 && nowMenuItem.code == 'TTPT'">
								<activity-product :orderSwitch="orderSwitch" :marchantId="marchantId" :temp-id="tempId" template-tag="TTPT" :countdown="true"></activity-product>
							</view>

							<!-- 推荐返利 -->
							<view style="background-color: #000" v-if="tempId > 4 && nowMenuItem.code == 'TJFL'"><tjfl-classify></tjfl-classify></view>

							<!-- 门店团购 -->
							<view style="background: #f9f9f9; padding-top: 40rpx" v-if="nowMenuItem.code == 'RESERVE'">
								<to-city
									:isToCity="isToCity"
									:address="markerInfo.address"
									msg="本店可预定商品，用户需到店取货或消费"
									:isToStore="isToStore"
									:temp-id="tempId"
									:marchantId="marchantId"
									:shop-list="toShoplist2"
									shopType="book"
									:activityInfo="userInfo"
								></to-city>
							</view>

							<!-- 同城配送 -->

							<view style="background: #f9f9f9; padding-top: 40rpx" v-if="nowMenuItem.code == 'DELIVERY'">
								<to-city
									:isToCity="isToCity"
									:address="markerInfo.address"
									msg="本店可同城配送商品，用户下单同城可配送"
									:isToStore="isToStore"
									:temp-id="tempId"
									:marchantId="marchantId"
									:shop-list="toShoplist"
									shopType="city"
									:activityInfo="userInfo"
								></to-city>
							</view>

							<!-- 秒杀专区 -->
							<view v-if="tempId > 4 && nowMenuItem.code == 'JSMS'">
								<activity-product
									:orderSwitch="orderSwitch"
									:marchantId="marchantId"
									:product-list="goodsList"
									:countdown="true"
									:temp-id="tempId"
									template-tag="JSMS"
								></activity-product>
							</view>

							<!-- 会员专区 -->
							<view v-if="nowMenuItem.code == 'MEMBER'" style="margin-top: 5rpx">
								<member :detailData="memberInfo" :memberGoodsList="memberGoodsList" :marchantId="marchantId"></member>
							</view>

							<!-- 商家文化 -->
							<view v-if="nowMenuItem.code == 'CULTURE'" style="margin-top: 40rpx"><Article :ArticleList="ArticleList" :marchantId="marchantId"></Article></view>

							<view class="foot"></view>
						</view>

						<!-- 首页 -->
						<view v-else-if="nowTabbarText == '首页' && tempId < 5" style="overflow-x: hidden; background: #fff">
							<view class="hoem-title">
								<!-- <text>访问量:999</text> -->
								<!-- <text>{{markerInfo.nickName}}</text> -->
								<!-- 原订阅按钮 -->
								<!-- <view class="subscription" catchtap="showDingYue">
            <text>+</text>
            <text>订阅</text>
        </view> -->
							</view>

							<!-- 新版首页开始22.5.26 -->
							<view class="home">
								<!-- <view class="home-navbar"
		style="{{'height:'+(statusBarHeight+navBarHeight+'px')+';'+('background-color:'+(titleNViewBackground?titleNViewBackground:'')+';')}}">
	</view>
	<view class="navbar">
		<view class="navbar-fixed">
			<view style="{{'height:'+(statusBarHeight-1+'px')+';'}}"></view>
			<view class="{{['navbar-content',(isSearch)?'search':'']}}"
				style="{{'height:'+(navBarHeight-2+'px')+';'+('width:'+(100+'%')+';')}}">
				<view style="{{'text-align:right;font-size:32rpx;'+('color:'+(font)+';')}}"></view>
			</view>
		</view>
		<view style="{{'height:'+(statusBarHeight+navBarHeight+'px')+';'}}"></view>
	</view> -->
								<!-- <view class="carousel-section"> -->
								<!-- <view class="titleNview-placing"></view>
		<view class="titleNview-background"
			style="{{'background-color:'+(titleNViewBackground?titleNViewBackground:'')+';'}}"></view> -->
								<!-- <view class="carousel" style="width:716rpx;margin: 0 auto;"> -->
								<view class="video" v-if="settingImg.top.fileurl.length > 1">
									<video
										:src="settingImg.top.fileurl[1]"
										mode="aspectFit"
										class="index1_img2"
										:autoplay="true"
										:muted="true"
										:controls="true"
										:show-mute-btn="true"
										:show-play-btn="true"
									>
										视频
									</video>
								</view>
								<!-- </view> -->
								<!-- </view> -->

								<!-- <view>
		<view
			style="width:700rpx;margin:0rpx auto;display:flex;align-items:center;justify-content:space-evenly;padding:20rpx;border-bottom: 1px solid #f7f7f7;">
			<view style="width:20%;display:flex;align-items:center;">
				<image style="width:32rpx;height:32rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon1.png" mode></image><text
					style="font-size:20rpx;margin-left:10rpx;">售后无忧</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;">
				<image style="width:32rpx;height:32rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon2.png" mode></image><text
					style="font-size:20rpx;margin-left:10rpx;">慢必赔</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;">
				<image style="width:32rpx;height:32rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon3.png" mode></image><text
					style="font-size:20rpx;margin-left:10rpx;">酒好价好</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;">
				<image style="width:32rpx;height:32rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon4.png" mode></image><text
					style="font-size:20rpx;margin-left:10rpx;">正品保障</text>
			</view>
		</view>
	</view> -->

								<!-- 吸顶 -->
								<!-- <view class="headpo {{isshowHead ? 'xpactive' :''}}" wx:if="{{nowTabbarText=='首页'}}">
  <view class='head-shop-info-box{{topBoxBg}}'>
    <view style="height:40px;margin-top: 100rpx;" class='me-fx-row me-fx-sb-c {{nowTabbarText=="首页"?"title-bar":""}}'>
     
        
        <view>
		<view style="width:700rpx;margin:10rpx auto;display:flex;align-items:center;margin-top:10rpx;padding:0 20rpx;">
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;"  bindtap="goimg">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">粉丝群</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;" bindtap="goCoupons">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon22.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">优惠劵</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;" bindtap="goIntegral">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon33.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">积分乐园</text>
			</view>
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;"  bindtap="membersEnt">       
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon44.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">会员专区</text>
			</view>
		
			<view style="width:20%;display:flex;align-items:center;flex-direction:column;"  bindtap="isShowTiktok">
				<image  style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon66.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">抖音小店</text>
			</view>
		</view>
	</view>

    </view>
  </view>
</view> -->
								<view>
									<view :class="'column ' + (isFixedTop ? 'fixed' : '')" id="navbar" :style="'padding-top:' + (settingImg.top.fileurl.length > 1 ? '10rpx' : '40rpx')">
										<view style="width: 700rpx; margin: 0rpx auto; display: flex; align-items: center">
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-if="codeInfo[0]" @tap="goimg">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">粉丝群</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-else @tap="jumpDefault">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon11.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">粉丝群</text>
											</view>
											<view
												style="width: 20%; display: flex; align-items: center; flex-direction: column"
												v-if="addcouponList1[0] || addcouponList2[0] || addcouponList3[0]"
												@tap="goCoupons"
											>
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/mianfeilipin.gif" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">优惠劵</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-else @tap="jumpDefault">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/mianfeilipin.gif" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">优惠劵</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" @tap="jumptuiguan">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/tuiguan.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">推广中心</text>
											</view>
											<!-- <view style="width:20%;display:flex;align-items:center;flex-direction:column;" bindtap="goIntegral">
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon33.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">积分乐园</text>
			</view> -->
											<!-- <view style="width:20%;display:flex;align-items:center;flex-direction:column;"   bindtap="membersEnt"> -->
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column">
												<coupon :marchantId="marchantId" :mainBusinessModel="mainBusinessModel"></coupon>
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/huiyuanhuodong.gif" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">会员专区</text>
											</view>
											<!-- <view style="width:20%;display:flex;align-items:center;flex-direction:column;" wx:else bindtap="jumpDefault"  data-index="3">       
				<image style="width:60rpx;height:60rpx;" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon44.png" mode></image><text
					style="font-size:22rpx;margin-top:10rpx;font-weight: 550;">会员专区</text>
			</view> -->

											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-if="commentList2s.length > 0">
												<activity-list
													v-if="commentList2s.length > 0"
													:shopList="shopList"
													:commentList="commentList2s"
													:marchantId="marchantId"
													:activityInfo="userInfo"
													:hotelList="hotelList"
													:temp-id="50"
												></activity-list>
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon55.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">商家推荐</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-else @tap="jumpDefault">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon55.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">商家推荐</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-if="businessInfo.notify[0]" @tap="isShowTiktok">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon66.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">抖音小店</text>
											</view>
											<view style="width: 20%; display: flex; align-items: center; flex-direction: column" v-else @tap="jumpDefault" data-index="5">
												<image style="width: 60rpx; height: 60rpx" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/icon66.png" mode></image>
												<text style="font-size: 22rpx; margin-top: 10rpx; font-weight: 550">抖音小店</text>
											</view>
										</view>
									</view>
									<view class="column" v-if="isFixedTop"></view>
								</view>

								<view>
									<view style="width: 700rpx; margin: 0 auto; background: #fff; padding: 20rpx; border-radius: 20rpx" v-if="JSMSactivity.length > 0">
										<view style="display: flex; align-items: center; justify-content: space-between">
											<image
												style="width: 128rpx; height: 30rpx; border-radius: 0"
												src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/miaosha.png"
												mode
											></image>
											<text style="font-size: 22rpx; font-weight: 550" @tap="jumpMore" :data-activityTag="JSMSactivity[0].templateTag">正在进行</text>
										</view>
										<view style="width: 100%; display: flex; align-items: center; margin-top: 20rpx" @tap="jumpMore" :data-activityTag="JSMSactivity[0].templateTag">
											<block v-if="index < 4" v-for="(item, index) in JSMSactivity" :key="index">
												<view style="display: flex; flex-direction: column; align-items: left; margin-right: 12rpx">
													<image style="width: 160rpx; height: 160rpx" :src="item.imageUrl" mode></image>
													<text style="width: 160rpx; height: 60rpx; font-size: 20rpx; font-weight: 550" class="u-line-2">{{ item.commodityName }}</text>
													<text style="color: red; font-size: 20rpx; margin-top: 10rpx; font-weight: 550">￥{{ item.showPrice }}</text>
													<text style="color: #999999; text-decoration: line-through; font-size: 20rpx; margin-top: 10rpx">￥{{ item.price }}</text>
												</view>
											</block>
										</view>
									</view>
								</view>

								<!-- 中间部分开始 -->
								<to-city
									:isToCity="isToCity"
									:isWuliu="isWuliu"
									:isToStore="isToStore"
									:address="markerInfo.address"
									msg="本店可预定商品，用户需到店取货或消费"
									:tempId="tempId"
									:marchantId="marchantId"
									:logisticsList="logisticsList"
									:shopList2="toShoplist2"
									:shop-list="toShoplist"
									shopType="book"
									:activityInfo="userInfo"
									:main-order-type="mainBusinessModel"
									:headImage="businessInfo.headImage"
									:nickName="markerInfo.nickName"
								></to-city>
								<!-- 中间部分结束 -->
								<!-- 通知部分开始 -->
								<!-- 老版通知 -->
								<activity-list
									v-if="commentList2s.length > 0"
									:shopList="shopList"
									:commentList="commentList2s"
									:marchantId="marchantId"
									:activityInfo="userInfo"
									:hotelList="hotelList"
									:temp-id="tempId"
								></activity-list>
								<!-- 通知部分结束 -->
								<!-- <view class="f-header" style="padding-left:30rpx;">猜你喜欢</view> -->
								<!-- <image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/jinrituijian.png" style="width: 200rpx;height:50rpx;margin-top: 60rpx;padding-left:30rpx;" mode="aspectFill"></image> -->
								<view style="display: flex; align-items: center; width: 300rpx; margin: 0 auto; margin-top: 60rpx">
									<text style="color: #999">——</text>
									<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/jinrituijian.png" style="width: 200rpx; height: 50rpx" mode="aspectFill"></image>
									<text style="color: #999">——</text>
								</view>

								<!-- <product wx:if='{{marchantId}}' orderSwitch='{{orderSwitch}}' marchantId='{{marchantId}}' product-list='{{mainGoodsList}}' temp-id='{{tempId}}' isWuliu='{{isWuliu}}' isToCity="{{isToCity}}" isToStore="{{isToStore}}" main-order-type='{{mainBusinessModel}}'>
  </product> -->
								<goods-recommend
									v-if="mainGoodsList.length !== 0"
									:orderSwitch="orderSwitch"
									@relogin="reLogin"
									@myManager="changeTab"
									:marchantId="marchantId"
									:mainGoodsList="mainGoodsList"
									:temp-id="6"
									:main-order-type="mainBusinessModel"
								></goods-recommend>
								<!-- <view class="guess-section" style="padding-left:50rpx;position:relative;">
		<block wx:for="{{4}}" wx:for-item="item" wx:for-index="index" wx:key="index">
			<view data-event-opts="{{[['tap',[['toDetail',['$0'],[[[4,'',index,'_id']]]]]]]}}" class="guess-item"
				bindtap="__e">
				<view class="image-wrapper">
					<image src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/tuijianguan/morenimage.jpg" mode="aspectFill"></image>
					<view
						style="padding:3rpx 10rpx;color:white;background:red;font-size:20rpx;position:absolute;top:0;left:50rpx;border-radius:10rpx;">
						门店团购</view>
				</view><text class="title clamp">科罗娜啤酒330ml 6瓶装</text><text class="price">￥55.8</text>
			</view>
		</block>
	</view> -->
							</view>

							<!-- 新版首页结束 -->

							<!-- 搜索 -->
							<!-- <view class="search-container">
            <view class="relative">
                <image mode="widthFix" src="../../static/images/Frame@2x.png"></image>
                <input class="search-input" 	placeholder="请输入搜索关键字" type="text" v-model="search" />
                <text>搜索</text>
            </view>
      </view> -->
							<view class="coupon-window-bgc" :style="'display:' + (isDiscount ? 'flex' : 'none')" @touchmove.stop.prevent="trueFun">
								<view class="coupon-window">
									<scroll-view @tap="a" :scroll-y="true" class="coupon-content-container">
										<view class="coupon-content-single" v-for="(item, index) in saleCanList" :key="index">
											<view class="price">
												<text>￥</text>
												<text>{{ item.deduct }}</text>
											</view>

											<view class="text">
												<text>满 {{ item.confine }} 可用</text>
												<text>{{ item.startTime }}-{{ item.endTime }}</text>
											</view>

											<image
												src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2FGroup%202999%402x.png"
												mode="aspectFill"
											></image>
										</view>
									</scroll-view>
									<image
										class="accept"
										@tap="receiveSale"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2F%E5%BC%80%E5%BF%83%E6%94%B6%E4%B8%8B.png"
									></image>
									<!-- <image class="accept" bindtap="jumpVolume" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2F%E5%BC%80%E5%BF%83%E6%94%B6%E4%B8%8B.png"></image> -->
									<image
										class="close"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E4%BC%98%E6%83%A0%E5%88%B8%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png"
										@tap="closeSale"
									></image>
								</view>
							</view>
							<!-- 抖音 -->
							<view>
								<view class="tiktok-window-bgc" :style="'display:' + (isTiktok ? 'flex' : 'none')">
									<view class="tiktok-cont">
										<image
											class="tiktok-bgc"
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FGroup%201624%402x.png"
										></image>
										<text>复制口令 访问抖音小店</text>
										<image
											class="copy"
											@tap="copyTiktok"
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FGroup%203001%402x.png"
										></image>
										<image
											class="close-tiktok"
											@tap="closeTiktok"
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png"
										></image>
									</view>
								</view>
							</view>

							<!-- banner -->
							<top-banner
								:settingImg="settingImg"
								@myManager="changeTab"
								:userInfo="userInfo"
								:banners="mainGoodsList"
								:appName="appName"
								:temp-id="tempId"
								:main-order-type="mainBusinessModel"
								:mainBanner="mainBanner"
								:addcoupon-list="addcouponList"
								:jifen-num="jifenNum"
							></top-banner>

							<!-- 当前商户是哪种模式，就只显示另外两种模式  LOGISTICS  RESERVE  DELIVERY -->
							<!-- 物流发送 同城配送  预订自提 -->
							<!-- <to-city isToCity="{{isToCity}}" isWuliu='{{isWuliu}}' isToStore="{{isToStore}}" address="{{markerInfo.address}}" msg="本店可预定商品，用户需到店取货或消费" tempId='{{tempId}}' marchantId='{{marchantId}}' logisticsList='{{logisticsList}}' shopList2="{{toShoplist2}}" shop-list="{{toShoplist}}" shopType="book" activityInfo="{{userInfo}}" main-order-type='{{mainBusinessModel}}'>
      </to-city> -->
							<!-- 老版通知 -->
							<!-- <activity-list  wx:if="{{commentList2s.length > 0}}" shopList='{{shopList}}' commentList="{{commentList2s}}" marchantId="{{marchantId}}" activityInfo="{{userInfo}}" hotelList='{{hotelList}}' temp-id='{{tempId}}'>
      </activity-list> -->
							<!-- 通知新版 -->

							<!-- 幸运大转盘 -->
							<!-- <view class="turntable-lucky">
          <image src="../../static/images/Frame 2570@3x.png" mode="widthFix"></image>
      </view> -->
							<!-- 签到有惊喜 -->
							<view class="signIn" @tap="toSignActivity" v-if="isOpenSignIn == 1">
								<image
									src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E7%AD%BE%E5%88%B0%E5%85%A5%E5%8F%A3.gif"
									mode="widthFix"
								></image>
							</view>
							<!-- 下面是首次进入提示的签到弹窗 -->
							<view class="signIn-window-bgc" v-if="isOpenSignIn == 1" :style="'display:' + (isShowSignInPopup ? 'flex' : 'none')">
								<view class="signIn-cont">
									<image
										class="signIn-bgc"
										@tap="toSignActivity"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E9%A6%96%E9%A1%B5%E7%AD%BE%E5%88%B0%E5%BC%B9%E7%AA%97.png"
										mode="widthFix"
									></image>

									<view class="jumpToSignIn" @tap="toSignActivity">
										<text>马上领商品</text>
										<image
											src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E7%AD%BE%E5%88%B0h5%2F%E7%AD%BE%E5%88%B0_%E5%88%86%E4%BA%AB%E6%8C%89%E9%92%AE%E5%BA%95%E5%9B%BE.png"
											mode="widthFix"
										></image>
									</view>
									<image
										class="close-signIn"
										@tap="closeSignInPopup"
										src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E6%8A%96%E9%9F%B3%E5%A4%8D%E5%88%B6%E5%BC%B9%E7%AA%97_slices%2FFrame%402x(1).png"
									></image>
								</view>
							</view>
							<!-- 视频已经移动到品牌故事中 -->
							<!-- <view class="video" wx:if="{{settingImg.top.fileurl.length > 1}}">
        <video src="{{settingImg.top.fileurl[1]}}" mode="aspectFit" class="index1_img2" autoplay="true" muted="true" controls="true" show-mute-btn="true" show-play-btn="true">视频</video>
        <image class="video-img" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E8%A7%86%E9%A2%91%E4%B8%93%E5%8C%BA%E8%83%8C%E6%99%AF%E5%9B%BE.png"></image>
      </view> -->
							<!-- wx:if="{{userInfo.promotionStatus}}" 请求有问题 -->

							<!-- 火热直播 -->
							<!-- <hot-live wx:if="{{hotLiveList.length !== 0}}"></hot-live> -->

							<!-- 秒杀、邀一返三、拼团活动列表 -->
							<!-- 可以根据wx:for:"{{pushType}}" 字段渲染 -->
							<!-- <tj-tg-ms-activity wx:if='{{marchantId!=-1}}' marchantId="{{marchantId}}" bind:myManager="changeTab" temp-id='{{tempId}}' activityType='{{pushType}}' homeActivity="{{homeActivity}}">
      </tj-tg-ms-activity> -->
							<!-- 会员中心和积分乐园  // 此处优惠券换成了会员中心，名字没改 -->
							<!-- <view class="integral-coupon">
        <coupon marchantId="{{marchantId}}" mainBusinessModel="{{mainBusinessModel}}"></coupon>
        <integral></integral>
       </view> -->
							<!-- 抖音弹窗和订阅消息还有会员中心，class没改，样式没改 -->
							<!-- <view class="tiktok-coupon  {{pageScrolling ? 'animation' : 'animation-reverse'}}"> -->
							<!-- 三个活动 -->
							<!-- <image class="coupon" mode="aspectFill" wx:if="{{TTPTactivity.length > 0}}" bindtap='jumpMore' data-activityTag="{{TTPTactivity[0].templateTag}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E5%A4%A9%E5%A4%A9%E6%8B%BC%E5%9B%A2%E6%B5%AE%E7%AA%97.gif"></image>
        <image class="coupon" mode="aspectFill" wx:if="{{JSMSactivity.length > 0}}" bindtap='jumpMore' data-activityTag="{{JSMSactivity[0].templateTag}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E6%80%A5%E9%80%9F%E7%A7%92%E6%9D%80%E6%B5%AE%E7%AA%97.gif"></image>
        <image class="coupon" mode="aspectFill" wx:if="{{TJFLactivity.length > 0}}" bindtap='jumpMore' data-activityTag="{{TJFLactivity[0].templateTag}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E9%82%80%E4%B8%80%E5%8F%8D%E4%B8%89%E6%B5%AE%E7%AA%97.gif"></image> -->
							<!-- 订阅 -->
							<!-- <image class="coupon" mode="aspectFill" bindtap="showDingYue" wx:if="{{isShowSub}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2F%E8%AE%A2%E9%98%85.gif"></image> -->
							<!-- 抖音 -->
							<!-- <image class="tiktok" mode="aspectFill" bindtap="isShowTiktok" wx:if="{{noticeContent[0] !== undefined}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FEllipse-%E6%8A%96%E9%9F%B3.gif" mode="aspectFill"></image> -->
							<!-- 加入会员 -->
							<!-- <image class="coupon" mode="aspectFill" bindtap="membersEnt" wx:if="{{userInfo.status==1&&userInfo.memberLeve == undefined}}" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E9%A6%96%E9%A1%B5_slices%2FEllipse-%E4%BC%9A%E5%91%98.gif"></image> -->
							<!-- <image class="coupon" mode="aspectFill" bindtap="jumpVolume" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/mianfeilipin.gif"></image> -->
							<!-- </view> -->

							<!-- 首页签到组件 -->
							<!-- <signInHome userInfo="{{userInfo}}" firstSignInData="{{signData}}"></signInHome> -->

							<!-- 今日推荐 -->
							<!-- <goods-recommend wx:if="{{mainGoodsList.length !== 0}}" orderSwitch='{{orderSwitch}}' bind:relogin="reLogin" bind:myManager="changeTab" marchantId='{{marchantId}}' mainGoodsList='{{mainGoodsList}}' temp-id='{{tempId}}' main-order-type='{{mainBusinessModel}}'>
      </goods-recommend> -->

							<!-- 首页推荐瀑布流形式 -->
							<!-- <product wx:if='{{marchantId}}' orderSwitch='{{orderSwitch}}' marchantId='{{marchantId}}' product-list='{{mainGoodsList}}' temp-id='{{tempId}}' isWuliu='{{isWuliu}}' isToCity="{{isToCity}}" isToStore="{{isToStore}}" main-order-type='{{mainBusinessModel}}'>
      </product> -->
							<!-- <view class="support bgF8  {{'page-foot'+tempId}}  support2">-<text>信书技术支持</text>-</view> -->
							<view :class="'support bgF8 support2 ' + ('page-foot' + tempId)">
								<image style="width: 182rpx; height: 30rpx" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/dibutab.png"></image>
							</view>
							<view class="foot"></view>
							<view class="page_right_img me-fx-col"></view>
						</view>

						<!-- 我的 -->
						<view v-if="nowTabbarText === '我的'">
							<my
								:orderSwitch="orderSwitch"
								:userInfo="userInfo"
								:orderNum="orderNum"
								:cityOrderNum="cityOrderNum"
								:activityInfo="userInfo"
								:toStoreOrderNum="toStoreOrderNum"
								:noticeNum="noticeNum"
								:toolsListNums="toolsListNums"
								:marchantId="marchantId"
								@pagesTo="pagesTo($event, { tagId: 'myInfos' })"
								:CouponsNum="CouponsNum"
								@toDetail="toDetail($event, { tagId: 'myInfos' })"
								:jifenNum="jifenNum"
								:isDistribution="markerInfo.isDistribution"
								:isWuliu="isWuliu"
								@reload="reload($event, { tagId: 'myInfos' })"
								:mainBusinessModel="mainBusinessModel"
								:isToCity="isToCity"
								:isToStore="isToStore"
								v-if="loadedList['我的']"
								:list="noticeContent"
								:signData="signData"
								:codeInfo="codeInfo"
								id="myInfos"
							></my>
							<!-- <view class="support bgF8 support2">-<text>信书技术支持</text>-</view> -->
							<view class="support bgF8 support2">
								<image style="width: 182rpx; height: 30rpx" mode="aspectFit" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/Saas/dibutab.png"></image>
							</view>
							<view class="foot bgF8"></view>
						</view>

						<!-- 商品推荐 -->
						<!-- <view wx:if='{{tempId>4}}' hidden='{{!(nowTabbarText=="商品推荐")}}'>
      <view style='height:{{statusBarHeight+menuButtonHeight}}px'></view>
      <view class="home-top-container bgFFF">
        <view style="height:{{statusBarHeight}}px"></view>
        <view class='me-fx-row me-fx-start-c font-cc' style="height:{{menuButtonHeight}}px">
          <view class="appName">商品推荐</view>
        </view>
      </view>
      <top-search subscribe='{{markerInfo.subscribe}}' bindevent='onGetSearchClick' marchantId='{{marchantId}}' temp-id='{{tempId}}' heights='{{statusBarHeight+menuButtonHeight}}'></top-search>
      <union wx:if="{{shopListOther.length>0}}" shopList='{{shopListOther}}' marchantId="{{marchantId}}" temp-id='{{tempId}}'></union>

      <recommend orderSwitch="{{orderSwitch}}" wx:if="{{loadedList['商品推荐']}}" recommends='{{recommends}}' bindrecommendEvent='parseRecommendEvent'></recommend>
      <view class="foot"></view>
    </view> -->

						<!-- 分类 -->
						<view v-if="nowTabbarText == '商品'">
							<view :style="'height:' + (statusBarHeight + menuButtonHeight) + 'px'"></view>
							<view class="home-top-container bgFFF">
								<view :style="'height:' + statusBarHeight + 'px'"></view>
								<view class="me-fx-row me-fx-start-c font-cc" :style="'height:' + menuButtonHeight + 'px'"><view class="appName">商品</view></view>
							</view>
							<view>
								<category-pages id="classify" v-if="marchantId != -1" :marchantId="marchantId" :temp-id="tempId" :main-order-type="mainBusinessModel">
									addcouponList="{{ addcouponList }}"
								</category-pages>
							</view>
						</view>
						<!-- 商家文化 -->
						<view v-if="nowTabbarText == '商家文化'" style="background-color: #f7f7f7">
							<view :style="'height:' + (statusBarHeight + menuButtonHeight) + 'px'"></view>
							<view class="home-top-container bgFFF">
								<view :style="'height:' + statusBarHeight + 'px'"></view>
								<view class="me-fx-row me-fx-start-c font-cc" :style="'height:' + menuButtonHeight + 'px'"><view class="appName">故事</view></view>
							</view>
							<!-- 商家文化 -->
							<shops-slogan :marchantId="marchantId" :ArticleList="ArticleList" :settingImg="settingImg" :mainBusinessModel="mainBusinessModel"></shops-slogan>
						</view>
						<!-- 购物车 -->
						<view v-if="nowTabbarText == '购物车'" style="background-color: #f7f7f7">
							<view :style="'height:' + (statusBarHeight + menuButtonHeight) + 'px'"></view>
							<view class="home-top-container bgFFF">
								<view :style="'height:' + statusBarHeight + 'px'"></view>
								<view class="me-fx-row me-fx-start-c font-cc" :style="'height:' + menuButtonHeight + 'px'"><view class="appName">购物车</view></view>
							</view>
							<shop-cart v-if="loadedList['购物车']" :main-order-type="mainBusinessModel" :marchantId="marchantId" :shopCartlist="shopCartlist"></shop-cart>
						</view>
						<view v-if="nowTabbarText == '购物车'" style="background-color: #f7f7f7"></view>
						<!-- 优惠券 style="{{isDiscount?'':'display:none'}}" -->
						<!-- <view style='display:{{isDiscount?"flex":"none"}}' class="promotion">
      <image class="sale_name" src="https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/sale_name.png"> </image>
      <view class="sale_list">
        <view class="sale-item-list me-fx-row" wx:if="{{index < 3}}" wx:for="{{saleCanList}}" wx:key="index" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/sale_bg.png)">
          <view class="sale_left me-fx-col">
            <text class="sale_left_name">{{item.couponName}}</text>
            <text class="sale_left_desc">满{{item.confine}}可用</text>
            <text class="sale_left_time">{{item.startTime}}-{{item.endTime}}</text>
          </view>
          <view class="sale_right me-fx-1 me-fx-row me-fx-c-c">
            <text class="sale_money">{{item.deduct}}</text>元
          </view>
        </view>
      </view>
      <view class="sale_bgfoot me-fx-row me-fx-c-c" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/sale_bg_foot.png)">
        <view class="sale_btns" bindtap="receiveSale" style="background-image:url(https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/br_foot.png)">{{saleState}}</view>
      </view>
      <image class="sale-close" bindtap="closeSale" src="/pages/img/goods/close.png"></image>
    </view> -->
						<!-- 底部tabbar栏 -->
						<tabbar :tab-list="tabList" @myManager="changeTab" :now-tabbar-text="nowTabbarText" :marker-info="markerInfo"></tabbar>
					</view>
				</view>

				<!-- 获取用户头像、昵称信息弹窗 -->
				<!-- <view wx:if="{{NickFlag}}" bindtap="bindGetUserInfo" class="mask_login"></view> -->

				<!-- 浏览用户 -->
				<!-- <view wx:if="{{nowTabbarText=='首页'}}" class='me-fx-row me-fx-start-c browse-user {{showHideStyle}}'>
  <image src='{{browseUser[subscriptIndex].headUrl || "../../static/def-user.png"}}' class='user-avatar-img'></image>
  <text>{{browseUser[subscriptIndex].nickName || '游客'}}在{{browseUser[subscriptIndex].humanize}}浏览店铺</text>
</view> -->
			</block>
		</block>
	</view>
</template>

<script>
import topSearch from '../components/search/search';
import toCity from '../components/ToCity/ToCity';
import topBanner from '../components/banner/banner';
import noticeMsg from '../components/notice/notice';
import goodsTypes from '../components/goodsTypes/goodsTypes';
import activityList from '../components/activity/activity';
import activityListV2 from '../components/activity_v2/activity_v2';
import categoryPages from '../components/category-pages/category-pages';
import addWechat from '../components/addWeChat/addWeChat';
import goodsRecommend from '../components/recommend/recommend';
import product from '../components/product/product';
import activityProduct from '../components/activity-product/activity-product';
import tabbar from '../components/Tabbar/tabbar';
import recommend from '../../Component/recommend/recommend';
import hotVideo from '../components/hotVideo/hotVideo';
import my from '../components/componentsPage/my/my';
import member from '../components/componentsPage/member/member';
import community from '../components/componentsPage/community/community';
import dynamicList from '../../Component/dynamic/index';
import videoList from '../../Component/videoList/index';
import shopCart from '../components/componentsPage/shopCart/shopCart';
import union from '../components/union/union';
import saleList from '../components/saleList/saleList';
import Article from '../components/Article/Article';
import culture from '../components/culture/culture';
import tjflClassify from '../components/tjfl-classify/tjfl-classify';
import tjTgMsActivity from '../components/tj-tg-ms-activity/tj-tg-ms-activity';
import shopsSlogan from '../components/shopsSlogan/shopsSlogan';
import coupon from '../components/coupon/coupon';
import integral from '../components/integral/integral';
import hotLive from '../components/hotLive/hotLive';
import signInHome from '../components/signInHome/signInHome';
import tomap from '../components/tomap/tomap';
// pages/Index/Index.js
// import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast';
// import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog';
import { getMainColor } from '../../../utils/image-main-color.js';

const time = require('../../../utils/util');

const app = getApp();

const formate = require('../../../utils/util');

export default {
	components: {
		topSearch,
		toCity,
		topBanner,
		noticeMsg,
		goodsTypes,
		activityList,
		activityListV2,
		categoryPages,
		addWechat,
		goodsRecommend,
		product,
		activityProduct,
		tabbar,
		recommend,
		hotVideo,
		my,
		member,
		community,
		dynamicList,
		videoList,
		shopCart,
		union,
		saleList,
		Article,
		culture,
		tjflClassify,
		tjTgMsActivity,
		shopsSlogan,
		coupon,
		integral,
		hotLive,
		signInHome,
		tomap
	},
	data() {
		return {
			loading: true,
			navbarInitTop: 0,

			//导航栏初始化距顶部的距离
			isFixedTop: false,

			//是否固定顶部
			addcouponList1: [],

			addcouponList2: [],
			addcouponList3: [],
			isOpenSignIn: 0,

			//签到活动是否开启  1开启 0关闭
			mainBanner: [],

			// banner主推图片，永远只有一条商品
			isShowSub: true,

			// 是否显示订阅浮窗
			hotLiveList: [],

			// 直播列表
			isTiktok: false,

			// 是否打开抖音复制口令
			isShowSignInPopup: true,

			// 是否显示签到活动的弹窗提示
			pageScrolling: false,

			// 页面正在滑动
			TTPTactivity: [],

			// 天天拼团活动
			JSMSactivity: [],

			// 急速秒杀活动
			TJFLactivity: [],

			// 退一反三活动
			addcouponList: [],

			// 优惠券列表的长度  .length
			isshowHead: false,

			marqueePace: 1,

			//滚动速度
			marqueeDistance: 0,

			//初始滚动距离
			marquee_margin: 30,

			size: 32,
			interval: 20,

			// 时间间隔
			tempBaseUrl: 'https://xssj.letterbook.cn/applet/images/',

			statusBarHeight: app.globalData.getSystemInfo.statusBarHeight || 20,

			// 状态栏高度
			menuButtonLeft: app.globalData.MenuButton.left,

			menuButtonHeight: app.globalData.MenuButton.height + (app.globalData.MenuButton.top - app.globalData.getSystemInfo.statusBarHeight) * 2,

			// 导航栏高度
			statusAllHeight:
				app.globalData.getSystemInfo.statusBarHeight + app.globalData.MenuButton.height + (app.globalData.MenuButton.top - app.globalData.getSystemInfo.statusBarHeight) * 2,

			menuHeight: app.globalData.MenuButton.height,

			// 胶囊高度
			loadedList: {},

			//记录已加载的tabbar页
			tempId: '',

			titleFlag: false,
			TypesNum: null,
			pageBg: '',
			topBoxBg: '',

			//顶部商家信息背景
			statusHeight: '',

			//状态栏高
			navTitleHeight: '',

			//标题栏高
			isAdapter: false,

			isClose: false,

			// 是否关店
			isWuliu: false,

			// 开启物流
			isToStore: false,

			// 开启到店
			isToCity: false,

			// 开启同城
			status: 1,

			status1: 1,
			orderSwitch: null,

			//开启支付
			navs: [
				{
					name: '购物车',
					src: '/static/img/my/menu-gwc.png',
					url: './ShopCart/ShopCart',
					inAnimation: 'menu-in-animation1',
					outAnimation: 'menu-out-animation1',
					bottom: '280rpx',
					right: '80rpx'
				},
				{
					name: '我的',
					src: '/static/img/my/menu-wd.png',
					url: '/pages/tabPage/me/me',
					bottom: '150rpx',
					right: '160rpx',
					inAnimation: 'menu-in-animation2',
					outAnimation: 'menu-out-animation2'
				},
				{
					name: '返回',
					src: '/static/img/my/menu-fh.png',
					url: 'top',
					bottom: '20rpx',
					right: '80rpx',
					inAnimation: 'menu-in-animation3',
					outAnimation: 'menu-out-animation3'
				}
			],

			uniqueId: '',

			// 用户标识
			noticeContent: '',

			buton: true,
			showFollow: false,

			// 关注弹框
			toolList: [],

			marchantId: -1,
			noticeNum: 0,
			orderType: 0,
			markerInfo: [],

			//商家信息
			goodsList: [],

			//商品
			personnel: '',

			//关注
			shopList: [],

			//零售店铺
			hotelList: [],

			// 酒店店铺
			ltSix: [],

			lgFive: [],
			saleGoodsList: [],
			hotSaleGoodsList: [],
			videoList: [],
			nowSaleGoods: {},
			activeEnter: false,
			showTaskPop: false,

			// 任务弹框
			taskText: '你已完成发布动态任务获取3积分',

			// 任务文字
			shopIndex: 0,

			isFixed: false,

			// 是否吸顶
			isPromotion: false,

			isPromotionIcon: false,
			isDiscount: false,
			saleCanList: [],
			saleState: '已领取',
			show: false,

			//下单弹框
			skuList: [],

			//规格列表
			skuActive: null,

			//当前规格
			goodsData: {},

			//当前商品数据
			buyNum: 1,

			//购买数量
			index: 0,

			//方式索引
			// tabbar
			nowTabbarText: '首页',

			tabList: [],
			recommends: [],

			tabList1: [
				{
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%BA%95%E9%83%A8_slices%2F%E9%A6%96%E9%A1%B5%E6%9B%BF%E6%8D%A22.png',
					imgActive: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%BA%95%E9%83%A8_slices/%E9%A6%96%E9%A1%B5%403x.png',
					text: '首页',
					isHave: true
				}, // {
				//   img:'/image/index/index7.png',
				//   imgActive:'/image/index/index7_active.png',
				//   text:'热卖',
				//   isHave:true
				// },
				{
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%BA%95%E9%83%A8_slices%2F%E9%A6%96%E9%A1%B5%402x(1).png',
					imgActive: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%BA%95%E9%83%A8_slices/%E9%A6%96%E9%A1%B5%403x%20%281%29.png',
					text: '商品',
					isHave: true
				},
				{
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%BA%95%E9%83%A8_slices/icon-%E9%9F%B3%E5%93%8D%20%403x.png',
					imgActive: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%BA%95%E9%83%A8_slices/icon-%E9%9F%B3%E5%93%8D%20%403x.png',
					text: '商家文化',
					isHave: true
				}, // {
				//   img:'/image/index/index6.png',
				//   imgActive:'/image/index/index6_active.png',
				//   text:'会员',
				//   isHave:true
				// },
				{
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%BA%95%E9%83%A8_slices%2Ficon-%E9%9F%B3%E5%93%8D%20%402x.png',
					// img: '/image/index/index5.png',
					// imgActive: '/image/index/index5_active.png',
					imgActive: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%BA%95%E9%83%A8_slices/Group%203206%403x.png',
					text: '购物车',
					isHave: true
				}, // {
				//   img:'/image/index/index3.png',
				//   imgActive:'/image/index/index3_active.png',
				//   text:'订阅通知',
				//   isHave:true
				// },
				{
					img: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New%2F%E5%BA%95%E9%83%A8_slices%2F%E6%88%91%E7%9A%84%201%402x.png',
					imgActive: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/basics-New/%E5%BA%95%E9%83%A8_slices/%E6%88%91%E7%9A%84%201%403x.png',
					text: '我的',
					isHave: true
				}
			],

			// 订阅通知
			weekList: ['星期日', '已签到', '未签到', '签到', '星期四', '星期五', '星期六'],

			commentList: [],

			// 评论列表
			storeDynamicList: [],

			// 商家动态列表
			storeList: [],

			// 小店排行列表
			// 我的
			headList: [
				// {
				//   num: 0,
				//   unit: '元',
				//   name: '余额',
				// },
				// {
				//   num: 0,
				//   unit: '张',
				//   name: '会员卡',
				// },
				{
					num: 0,
					unit: '分',
					name: '积分'
				},
				{
					num: 0,
					unit: '张',
					name: '优惠券'
				}
			],

			toolOrderList: [
				{
					icon: '/static/pages/img/my/kefu.png',
					name: '客服',
					url: '/pages/order/contact/contact'
				},
				{
					icon: '/static/pages/img/my/shop-cart.png',
					name: '购物车',
					url: '/pages/Index/ShopCart/ShopCart'
				},
				{
					icon: '/static/pages/img/my/wodedontai.png',
					name: '评论',
					url: '/pages/Index/dynamic/commentList/commentList'
				},
				{
					icon: '/static/pages/img/my/notice.png',
					name: '优惠券',
					url: '/pages/Index/couponList/couponList'
				},
				{
					icon: '/static/pages/img/my/paimai_icon.png',
					name: '喊价',
					url: `/pages/activity/pmhd/pmEnter/pmEnter`
				},
				{
					icon: '/static/pages/img/my/store_apply.png',
					name: '小店申请'
				},
				{
					icon: '/static/pages/img/my/ruzhu.png',
					name: '商家入驻'
				},
				{
					icon: '/static/pages/img/my/price.png',
					name: '我的中奖',
					url: `/pages/shopHome/prize/prize`
				}
			],

			isIntegral: 0,

			// 是否进入订阅通知
			userInfo: {},

			// 用户信息
			orderNum: [],

			// 订单数字
			cityOrderNum: [],

			// 同城配送订单数字
			toStoreOrderNum: [],

			// 到店订单数字
			// 购物车
			openOverlay: false,

			show1: false,
			value: '',
			num: '',
			isAll: false,
			shopCartlist: [],
			listItem: '',

			// 热卖
			videoList: [],

			hotSaleGoodsList: [],

			// 热卖商品列表
			nowSaleGoods: {},

			// 当前热卖商品
			isLogin: false,

			bgFlag: true,
			countDown: '',

			//积分活动倒计时
			timeData: {},

			overTime: false,

			// 倒计时结束,
			appName: '',

			pageBgScorll: '',
			CouponsNum: 0,
			NickFlag: false,
			codeFlag: false,
			codeImg: '',
			memberInfo: {},
			Moments: '0',
			codeInfo: [],
			toShoplist: [],

			//同城商品
			toShoplist2: [],

			//预订商品
			logisticsList: [],

			//物流商品
			settingImg: {
				top: {
					fileurl: []
				}
			},

			orderCount: 0,

			//销量数
			accessCount: 0,

			//访问数
			textFlag: true,

			ArticleList: [],

			// 商家文化数据
			shopListOther: [],

			businessInfo: {
				notify: '',
				headImage: '',
				nickName: '',
				labelsList: [],
				openingTime: '',
				entirelyAddress: '',
				personalDetails: '',
				longitude: '',
				address: '',
				latitude: ''
			},

			memberGoodsList: [],
			commentList2s: [],

			businessItem: [
				{
					name: '全国发货'
				},
				{
					name: '到店自取'
				},
				{
					name: '同城配送'
				},
				{
					name: '拼团专区'
				},
				{
					name: '秒杀专区'
				},
				{
					name: '推荐返利'
				},
				{
					name: '会员专区'
				},
				{
					name: '商家文化'
				}
			],

			currentIndex: '全国发货',
			auctionNum: 0,

			activityList: [
				{
					imgUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp-hanjia.png',
					name: '全民喊价专场',
					linkUrl: '/pages/activity/pmhd/list/list'
				},
				{
					imgUrl: 'https://xinshusj-1301305452.cos.ap-guangzhou.myqcloud.com/static/temp-jifen.png',
					name: '积分换好礼',
					linkUrl: '/pages/Index/integral/integral'
				}
			],

			exchangeGoodsList: [],
			auctionList: [],
			signData: {},
			mmNotag: true,
			toolsListNums: {},

			//个人中心我的工具红点数量
			tsfyOrderCount: 0,

			//推三反一订单数量
			topMenuList: [],

			//头部切换菜单
			nowMenuItem: {
				code: ''
			},

			//当前激活的菜单项
			pushType: '',

			//首页推送活动类型 TJFL JSMS TTPT
			showActivityRkInfo: {
				//活动入口弹窗显示状态 信息
				popupBox: false,
				TJFL: false,
				TTPT: false,
				JSMS: false
			},

			showHideStyle: '',

			//控制浏览用户显示隐藏样式 'show-bur'显示 'hide-bur'隐藏
			subscriptIndex: 0,

			//
			browseUser: [],

			mainBusinessModel: '',

			//主推页面字段 1物流 2预订 3同城
			//主推业务商品 物流 同城 预订  暂时代替商家推荐与banner中的商品，这个字段只显示4个商品
			mainGoodsList: [],

			tiemoutId: null,

			// 存储定时器
			tiemoutId2: null,

			environment: '',
			isShare: false,
			activeStatuList: '',
			scene: '',
			cartNum: '',
			jifenNum: '',
			close: false,
			isAuthorization: false,
			codeName: '',
			length: '',
			windowWidth: '',
			templateTag: ''
		};
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.onLoadClone3389(options);
	},
	onReady() {
		setTimeout(() => {
			var environment = app.globalData.environment;
			this.setData({
				environment
			});
		}, 2500);
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		this.onShowClone3389();
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {},
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {
		app.globalData.userLogin(true).then(res => {
			console.log(res, '下拉刷新'); // let skinId = app.globalData.setInfo.skinId ? app.globalData.setInfo.skinId : "1"

			let skinId = '3.1'; // 下拉刷新不改变模板，上面代码为改变模板

			this.setData({
				appName: app.globalData.setInfo.appName,
				pageBg: 'bg_AllPage' + skinId,
				topBoxBg: 'top-box-bg' + skinId,
				tempId: skinId,
				orderSwitch: res.orderSwitch
			});

			if (!res.orderSwitch) {
				let list = this.tabList1;
				list.splice(2, 1);
				this.setData({
					tabList: list
				});
			} else {
				this.setData({
					tabList: this.tabList1
				});
			}

			this.indexShow();
			app.globalData.globalEvent.$emit('homeRefresh');
		});
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 2000);
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {},
	/**
	 * 用户点击右上角分享
	 */
	onShareTimeline: function() {
		let skinId = this.tempId;
		let appName = app.globalData.setInfo.appName;
		return {
			query:
				'marchantId=' +
				this.marchantId +
				'&Moments=1' +
				'&skinId=' +
				skinId +
				'&appName=' +
				appName +
				'&orderSwitch=' +
				this.orderSwitch +
				'&currentIndex=' +
				this.currentIndex +
				'&nowTabbarText=' +
				this.nowTabbarText
		};
	},
	onShareAppMessage: function() {
		let uniqueId = uni.getStorageSync('uniqueId1');
		return {
			title: this.markerInfo.nickName,
			path:
				'/pages/shopHome/home/home?marchantId=' +
				this.marchantId +
				'&uniqueId=' +
				uniqueId +
				'&nowPage=' +
				this.nowTabbarText +
				'&orderSwitch=' +
				this.orderSwitch +
				'&currentIndex=' +
				this.currentIndex +
				'&skinId=' +
				skinId +
				'&sss=1111',
			imageUrl: this.markerInfo.homeImg[0]
		};
	},
	onPageScroll: function(e) {
		// console.log(this.data.settingImg.top.fileurl.length > 1 ,'6669998');
		var that = this;
		var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度

		var isSatisfy; //判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断

		if (this.settingImg.top == null) {
			if (scrollTop + 188 >= that.navbarInitTop) {
				isSatisfy = true;
			} else {
				isSatisfy = false;
			}
		} else {
			if (scrollTop >= that.navbarInitTop) {
				isSatisfy = true;
			} else {
				isSatisfy = false;
			}
		} // isSatisfy = scrollTop >= that.data.navbarInitTop   ? true : false;
		//为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等

		if (that.isFixedTop === isSatisfy) {
			return false;
		}

		that.setData({
			isFixedTop: isSatisfy
		});

		if (e.scrollTop >= 100) {
			this.setData({
				pageBgScorll: 'bgsss' + this.tempId,
				titleFlag: true
			});
			this.setData({
				isshowHead: true
			});
		} else {
			this.setData({
				pageBgScorll: '',
				titleFlag: false
			});
			this.setData({
				isshowHead: false
			});
		}
	},
	methods: {
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoadClone3389: function(options) {
			let imgFlag = app.globalData.imgFlag; // this.progressiveLoad()

			uni.setBackgroundColor({
				// 窗口的背景色为白色
				backgroundColor: '#111833'
			});

			if (options.currentIndex) {
				this.setData({
					currentIndex: options.currentIndex
				});
			} //

			if (app.globalData.scene == '1154') {
				let list = this.tabList1;
				var skinId = options.skinId;

				if (skinId > 4) {
					list[1].text = '商品推荐';
				}

				this.setData(
					{
						isShare: true,
						tabList: list,
						appName: options.appName,
						pageBg: 'bg_AllPage' + options.skinId,
						topBoxBg: 'top-box-bg' + options.skinId,
						tempId: skinId,
						marchantId: options.marchantId || -1,
						mmNotag: false
					},
					() => {
						// this.getTopMenu(options.marchantId); //获取头部切换菜单
						// this.getActivity(options.marchantId)  // 获取活动列表
						this.indexShow();
						setTimeout(() => {
							this.queryBrowseUser();
						}, 4000); //获取浏览用户
					}
				);

				if (!imgFlag) {
					// 获取商家上传的视频
					this.getImgUrl();
				}
			} else {
				app.globalData.userLogin(true).then(async res => {
					// let skinId = app.globalData.setInfo.skinId || "1";
					let skinId = '';

					if (app.globalData.setInfo.skinId == 13) {
						skinId = 3.1;
					} else {
						//  skinId = app.globalData.setInfo.skinId || "1";
						skinId = 3.1;
					} // let skinId = 3.1|| "1";

					let ids = app.globalData.setInfo.merchantId;

					if (!res.nickname && res !== 'true') {
						this.setData({
							NickFlag: true
						});
					} // let list = this.data.tabList1;

					if (skinId > 4) {
						list[1].text = '商品推荐';
					}

					if (!res.orderSwitch) {
						list.splice(2, 1);
					}

					this.setData(
						{
							// tabList: list,
							businessInfo: app.globalData.setInfo,

							appName: app.globalData.setInfo.appName,
							pageBg: 'bg_AllPage' + skinId,
							topBoxBg: 'top-box-bg' + skinId,
							tempId: skinId,
							marchantId: ids || -1,
							orderSwitch: res.orderSwitch
						},
						() => {
							this.getTopMenu(ids); //获取头部切换菜单

							this.indexShow();
							setTimeout(() => {
								this.queryBrowseUser();
							}, 4000); //获取浏览用户
						}
					);

					if (!imgFlag) {
						// 获取商家上传的视频
						this.getImgUrl();
					}

					if (options.scene) {
						const scene = decodeURIComponent(options.scene);
						await this.getCodeParams(scene);
					} else {
						this.setData({
							personnel: options.personnel || '',
							uniqueId: options.uniqueId || ''
						});
					}
				});
			}

			let loadedList = this.loadedList;
			loadedList[options.nowPage ? options.nowPage : '首页'] = true;
			this.setData({
				nowTabbarText: options.nowPage || '首页',
				loadedList: loadedList
			});
			this.getLiveList(); // 获取直播间列表
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShowClone3389: function() {
			let extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
			let appName = extConfig.appName ? extConfig.appName : '';
			uni.hideHomeButton(); //隐藏返回首页按钮

			var that = this;
			var query = uni.createSelectorQuery();
			query.select('#navbar').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(function(res) {
				console.log(res, 'topppppppppp');
				that.setData({
					navbarInitTop: res[0].top
				});
			});

			if (this.marchantId != -1) {
				this.getCartNum();
				this.getUserInfo();
				this.getUserIntegral();
				this.getOrderNum();
				this.geteCountDown(); //获得积分任务列表
			}

			if (this.nowTabbarText == '我的') {
			}
		},

		indexShow() {
			this.getShopList();
			this.getShopList2();
			this.getLogisticsList();
			this.getUserInfo();

			if (this.uniqueId) {
				this.getShareState();
			} // this.shopRecommendList()//5.30注
			// this.queryRecommendList() //商家推荐商品//5.30注
			// this.getCategoryGoods() //获得分类商品//5.30注

			this.isShowSale(); //促销弹框
			// this.getLiveList() // 获取直播列表//5.30注
			// this.getCategoryGoodsList()//5.30注
			// this.getIsOpenSignIn()  //是否开启签到

			this.getMemberGoodsList();
			this.getOrderNums();
			this.getSignData(); // this.shopRecommendList2()//5.30注
			// this.isShowPromotion()

			this.setData({
				activeStatuList: app.globalData.activeStatuList,
				isAdapter: app.globalData.isAdapter
			}); 
			// this.getWidth()//文字特效//5.30注

			this.getArticle();
			this.WXgroup(); //5.30注
			// this.getMemberInfo()//5.30注

			this.showMarkerInfo(); // this.getIntegralInfo()
			// this.getAuctionList()
			// this.getUserIntegral()//5.30注

			this.getCommunityList();
			this.getCouponList(); // this.getWillActivity('TTPT')  // 三个活动的接口//5.30注

			this.getWillActivity('JSMS'); // this.getWillActivity('TJFL')//5.30注
		},

		//是否从小程序码进来
		getCodeParams(id) {
			let data = {
				id: id
			};
			let that = this;
			return app.globalData.sjrequest('/marchant/queryIdentifica', data).then(res => {
				if (res.data.code == 200) {
					that.setData({
						scene: JSON.parse(res.data.data.scene),
						marchantId: JSON.parse(res.data.data.scene).id
					});
					app.globalData.marchantId = JSON.parse(res.data.data.scene).id;

					if (that.scene.pid) {
						this.setData({
							personnel: that.scene.pid
						});
					}

					that.onShowClone3389({});
				}
			});
		},

		// /activityBusiness/pageList
		//通知移植
		//通知end
		// 获取首页三个活动的数据， 调用三次
		getWillActivity(templateTag) {
			app.globalData
				.sjrequest1('/activityBusiness/pageList', {
					merchantId: this.marchantId,
					templateTag
				})
				.then(res => {
					if (res.statusCode == 200 && res.data.code === 0 && res.data.data) {
						var list = res.data.data.list;
						list.forEach(item => {
							var nowTime = new Date().getTime();

							if (item.state == 1) {
								//活动未开始
								var startTime = this._parseDate(item.startTime, 'number');

								var diffTimes = startTime - nowTime;
							} else {
								var endTime = this._parseDate(item.endTime, 'number');

								var diffTimes = endTime - nowTime;
							}

							item.diffTimes = diffTimes;
							item.times = {
								days: 0,
								hours: 0,
								minutes: 0,
								seconds: 0
							};
							item.activityCommoditySkuList = item.activityCommoditySkuList || [];
							var skuItem = item.activityCommoditySkuList[0] || {};
							item.imageUrl = item.bannerImgUrls[0];
							item.price = skuItem.price;
						});
						var keyName = templateTag + 'activity';
						this.templateTagactivity = list;
						console.log(this[keyName], keyName + '');
					}
				});
		},

		getTopMenu(marchantId) {
			//5至8模板顶部导航菜单
			app.globalData
				.sjrequest1('/appletMenu/list', {
					marchantId
				})
				.then(res => {
					if (res.statusCode == 200 && res.data.code === 0) {
						var data = res.data.data || [];
						var nowMenuItem = data[0] || {};
						var currentIndex = nowMenuItem.name;
						var tempArr = ['TTPT', 'TJFL', 'JSMS'];
						var showActivityRkInfo = this.showActivityRkInfo;
						var pushType = '';
						data.forEach(item => {
							var bool = tempArr.includes(item.code);

							if (bool && !pushType) {
								pushType = item.code;
							}

							if (bool) {
								showActivityRkInfo.popupBox = true;
								showActivityRkInfo[item.code] = true;
								this.setData({
									showActivityRkInfo
								});
							}
						});
						this.setData({
							topMenuList: data,
							nowMenuItem,
							currentIndex,
							pushType
						});
					}
				});
		},

		// 获得积分倒计时
		geteCountDown() {
			let data = {
				marchantId: this.marchantId,
				type: 3
			};
			app.globalData.sjrequest('/integral/operateSignin', data).then(res => {
				if (res.data.code == 200) {
					let time1 = time.formatTimeSec(res.data.data.countDownTime || '');
					time1 = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
					this.setData({
						countDown: time1
					});
				}
			});
		},

		changeTime(e) {
			this.setData({
				timeData: e.detail
			});
		},

		// 倒计时结束
		overTimeFun() {
			this.setData({
				overTime: true
			});
		},

		// 完成任务
		toFinishTask(e) {
			let url = e.currentTarget.dataset.url;
			uni.navigateTo({
				url: url + '?marchantId=' + this.marchantId
			});
		},

		//获得购物车数量
		getCartNum() {
			var data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/commodity/countTrolley', data).then(res => {
				if (res.data.code == 200) {
					var countTrolley = res.data.data.countTrolley;
					this.setData({
						cartNum: countTrolley
					});
				}
			});
		},

		// 跳会员
		toMember() {
			uni.navigateTo({
				url: `/pages/member/card/card?marchantId=${this.marchantId}`
			});
		},

		// 跳会员
		toIntergral() {
			uni.navigateTo({
				url: `/pages/Index/integral/integral?marchantId=${this.marchantId}`
			});
		},

		/**图片预览 */
		imgClick(e) {
			var src = e.currentTarget.dataset.src;
			var imgList = e.currentTarget.dataset.list;
			var list = [];

			for (var index = 0; index < imgList.length; index++) {
				list[index] = imgList[index].httpAddress;
			}

			uni.previewImage({
				current: src,
				urls: list
			});
		},

		/**商家基本信息 */
		showMarkerInfo() {
			var data = {
				id: this.marchantId
			};
			app.globalData.sjrequest('/marchant/queryMarchantInfo', data).then(res => {
				console.log(res, '商家基本信息');

				if (res.data.code == 200) {
					var result = res.data.data;
					var businessInfo = this.businessInfo;
					businessInfo.headImage = result.logoPic;
					businessInfo.nickName = result.nickName;
					businessInfo.notify = result.notify;
					businessInfo.status = result.status;
					businessInfo.personalDetails = result.personalDetails;
					businessInfo.entirelyAddress = result.entirelyAddress;
					businessInfo.labelsList = result.labelsList;
					businessInfo.openingTime = result.openingTime;
					businessInfo.telephone = result.telephone;
					businessInfo.address = result.address;
					businessInfo.latitude = result.latitude;
					businessInfo.longitude = result.longitude;
					this.setData({
						businessInfo
					});
					this.getMainGoods(result.mainBusinessModel); // 获取商家今日推荐商品

					this.getMainBanner(); // 获取banner图片和商品

					uni.setStorage({
						key: 'mainBusinessModel_key',
						data: result.mainBusinessModel
					});

					if (result.businessModel) {
						let listItem = this.businessItem;

						if (result.businessModel.indexOf('1') != -1) {
							this.setData({
								isWuliu: true
							});
						}

						if (result.businessModel.indexOf('2') != -1) {
							this.setData({
								isToCity: true
							});
						} else {
							listItem.map((res, index) => {
								if (res.name == '同城配送') {
									listItem.splice(index, 1);
								}
							});
						}

						if (result.businessModel.indexOf('3') != -1) {
							this.setData({
								isToStore: true
							});
						} else {
							listItem.map((res, index) => {
								if (res.name == '到店自取') {
									listItem.splice(index, 1);
								}
							});
						}

						if (this.isToStore) {
							this.tabList1[2].isHave = false;
						}

						this.setData({
							businessItem: listItem
						});
					}

					let orderType = result.businessModel.split(',').sort();
					orderType = orderType[0];
					this.setData({
						orderType: orderType
					}); // if(!result.isfans&&!this.data.buton){
					//   this.setData({
					//     showFollow:true
					//   })
					// }

					if (result.thepointSins) {
						result.thepointSins.forEach(item => {
							item.addTime = formate.formatDate(item.addTime);
						});
					}

					var noticeTxt = '';

					if (result.notify) {
						result.notify.forEach(item => {
							noticeTxt = noticeTxt + item.content;
						});
					}

					if (res.data.data.marchantCorrelationList.length) {
						var list = [];
						var hotelList = [];
						res.data.data.marchantCorrelationList.forEach(item => {
							if (item.marchantCorrelation.source == 1) {
								list.push(item);
							}

							if (item.marchantCorrelation.source == 2) {
								hotelList.push(item);
							}
						});
					} //result.shopTemplateId=7;测试赋值

					this.setData({
						tabList: this.tabList1,
						markerInfo: result,
						noticeContent: result.notify,
						shopList: list,
						hotelList: hotelList,
						mainBusinessModel: result.mainBusinessModel //主推页面 物流 预订 同城
					});
				} else if (res.data.code == 338) {
					this.setData({
						isClose: true
					});
				}
			});
		},

		// 分享转发
		getShareState() {
			let data = {
				marchantId: this.marchantId,
				uniqueId: this.uniqueId,
				type: 4
			};
			app.globalData.sjrequest('/transiter/onTransmit', data).then(res => {});
		},

		async showDingYue1() {
			// 订阅
			var that = this;
			uni.requestSubscribeMessage({
				tmplIds: [app.globalData.sj_commodity_modify, app.globalData.sj_commodity_add],
				success: function(res) {
					uni.getSetting({
						withSubscriptions: true,
						success: result => {
							if (
								result.subscriptionsSetting['5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc'] == 'accept' ||
								result.subscriptionsSetting['7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI'] == 'accept'
							) {
								that.setData({
									status1: 2
								});
								console.log('总是订阅');
							} else {
								console.log('订阅1次');
							}

							if (res['5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc'] == 'accept' || res['7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI'] == 'accept') {
								let data = {
									status: that.status1,
									marchantId: that.marchantId,
									templateIds: '5TDTuj6Dq289EzrnzvpHD3Y_MEranwSWe8bON7IJsNc,7Xn5f85WfODTkVQqQCWxNGuJA95Lm8jGYFYef0pnveI'
								};
								app.globalData.sjrequest('/basic/addsubscription', data).then(res => {
									if (res.data.code == 200) {
										let isDingYue = 'markerInfo.subscribe1';
										that[markerInfo.subscribe1] = 1;
										uni.showToast({
											title: '订阅消息成功'
										});
									} else {
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										});
									}
								});
							}
						}
					});
				},

				fail() {
					uni.showToast({
						title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
						icon: 'none'
					});
				}
			});
		},

		// 个人中心
		toMy() {
			uni.switchTab({
				url: '/pages/tabPage/me/me'
			});
		},

		/** 商家推荐商品 **/
		queryRecommendList() {
			var data = {
				marchantId: this.marchantId,
				pageSize: 10,
				pageNum: 1
			};
			app.globalData.sjrequest('/commodity/queryRecommendList', data).then(res => {
				if (res.data.code == 200) {
					var result = res.data.data;
					this.setData({
						recommends: result
					});
				}
			});
		},

		/** 店铺推荐 */
		shopRecommendList() {
			var data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/marchant/queryRecommendList', data).then(res => {
				if (res.data.code == 200) {
					var result = res.data.data;
					this.setData({
						shopList: result
					});
				}
			});
		},

		scroll(e) {
			this.setData({
				shopIndex: Math.round((e.detail.scrollLeft / 529) * 2)
			});
		},

		/** 添加关注 */
		addDelConcerns() {
			var data = {
				marchantId: this.marchantId,
				type: 1
			};

			if (this.personnel != 0) {
				data.saleUniqueId = this.personnel;
			}

			app.globalData.sjrequest('/marchant/operateConcerns', data).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '关注成功！',
						icon: 'success'
					});
					this.markerInfo.isfans = 1;
					this.setData({
						markerInfo: this.markerInfo,
						showFollow: false
					});
				}
			});
		},

		// 关闭关注弹框
		closeFollow() {
			this.setData({
				showFollow: false
			});
		},

		/** 获得分类商品 */
		getCategoryGoods() {
			var orderTemplate = uni.getStorageSync('mainBusinessModel_key');
			var data = {
				marchantId: this.marchantId,
				orderTemplate,
				pageCurr: 1,
				pageSize: 20
			};
			app.globalData.sjrequest('/commodity/queryClassifyCommodityList', data).then(res => {
				if (res.data.code == 200) {
					// res.data.data.forEach(item => {
					//   var dataList={'marchantId':this.data.marchantId,'classifyId':item.id,'pageCurr':1,'pageSize':5}
					//   app.sjrequest('/commodity/queryCommodityList',dataList).then(result =>{
					//     if(result.data.code==200){
					//       item.list = result.data.data
					//     }
					let items = [];
					res.data.data.map((item, index) => {
						if (item.commodityList.length != 0) {
							items.push(item);
						}
					});
					this.setData({
						goodsList: items
					}); //   })
					// });
				}

				console.log(this.goodsList, 'set');
			});
		},

		/** 查看商品详情 */
		toGoodsDetails(e) {
			var id = e.currentTarget.dataset.id;
			uni.navigateTo({
				url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + id
			});
		},

		/** 加入购物车 */
		addCart(e) {
			var item = e.item || e.currentTarget.dataset.item;
			item.itemText = '';
			this.setData({
				goodsData: item,
				buyNum: 1,
				skuActive: null,
				show: true
			});
			this.getSku(item.commodityId); // var item = e.currentTarget.dataset.item
			// var data={
			//   'tempSpecId':item.tempSkuId,
			//   'commodityId':item.commodityId,
			//   'amount':1,
			//   'marchantId':this.data.marchantId,
			//   'operate':1
			// }
			// app.sjrequest('/commodity/addTrolley',data).then(res =>{
			//   if(res.data.code==200){
			//     this.getCartNum()
			//     wx.showToast({
			//       title:'添加成功',
			//       icon:'success'
			//     })
			//   }
			// })
		},

		// 获得商品规格
		getSku(commodityId) {
			var that = this;
			var data = {
				commodityId: commodityId,
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/commodity/queryCommoSku', data).then(res => {
				if (res.data.code == 200) {
					that.setData({
						skuList: res.data.data,
						goodsData: res.data.data[0]
					});
					res.data.data.forEach((item, index) => {
						let skuItem = 'skuList[' + index + '].active';

						if (item.isDefault == 1) {
							that.skuList[index].active = true;
							that.setData({
								goodsData: item
							});
						} else {
							that.skuList[index].active = false;
						}
					});
				}
			});
		},

		//关闭商品弹框
		onClose1() {
			this.setData({
				show: false
			});
		},

		// 切换 sku
		handleSelectSku(e) {
			if (this.skuActive === e.currentTarget.dataset.index) {
				return;
			} else {
				this.setData({
					skuActive: e.currentTarget.dataset.index
				});
				this.skuList.forEach((el, i) => {
					let skuItem = 'skuList[' + i + '].active';
					this.skuList[i].active = false;
				});
				let skuItem = 'skuList[' + this.skuActive + '].active';
				this.skuList[this.skuActive].active = true;
				this.setData({
					goodsData: this.skuList[this.skuActive]
				});
			}
		},

		// 编辑数量
		handleEdit(e) {
			if (e.currentTarget.dataset.type === 'minus') {
				// 减一
				if (this.buyNum === 1) {
					uni.showToast({
						title: '数量不能少于1',
						icon: 'none'
					});
					return;
				} else {
					this.setData({
						buyNum: this.buyNum - 1
					});
				}
			} else {
				// 加一
				this.setData({
					buyNum: this.buyNum + 1
				});
			}
		},

		// 加入购物车
		handlePopupAddCart() {
			var data = {
				tempSpecId: this.goodsData.id,
				commodityId: this.goodsData.commodityId,
				amount: this.buyNum,
				marchantId: this.marchantId,
				operate: 1
			};
			app.globalData.sjrequest('/commodity/addTrolley', data).then(res => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					});
					this.getCartNum();
				}
			});
		},

		//确认下单
		surexf() {
			if (this.goodsData.stock == 0) {
				uni.showToast({
					title: '暂无库存',
					icon: 'none'
				});
				return;
			}

			let jsonData = {
				marchantId: this.marchantId,
				orderType: this.orderType,
				commoditys: [
					{
						commodityId: this.goodsData.commodityId,
						tempSpecId: this.goodsData.id,
						amount: this.buyNum
					}
				]
			}; // 使用社交token

			const token = uni.getStorageSync('token');
			app.globalData.sjrequest1('/order/onekeyAboutOrder', jsonData, token).then(res => {
				if (res.data.code === 200) {
					
					// 更新 store 数据
					app.globalData.store.setState({
						submitObj: JSON.stringify(res.data.data)
					});
					uni.navigateTo({
						url: '/pages/order/submitOrder/submitOrder'
					});
				}
			}); // }
		},

		/** 获取秒杀数据 */
		getSeckill() {
			const data = {
				merchantId: this.marchantId
			};
			var token = uni.getStorageSync('token');
			app.globalData.sjrequest1('/activity/findActivityState', data, token).then(res => {
				if (res.data.code == 200) {
					var list = res.data.data;
					list.forEach(item => {
						switch (item.state) {
							case -1:
								item.name = '未开放';
								break;

							case 0:
								item.name = '未发布';
								break;

							case 1:
								item.name = '未开始';
								break;

							case 2:
								item.name = '进行中';
								break;

							case 3:
								item.name = '已结束';
								break;
						}
					});
					this.setData({
						toolList: res.data.data
					});
				}
			});
		},

		/** 去秒杀 */
		toSeckill(e) {
			var index = e.currentTarget.dataset.index;

			if (this.toolList[index].state == 1 || this.toolList[index].state == 2) {
				uni.navigateTo({
					url: this.toolList[index].url + '?marchantId=' + this.marchantId
				});
			} else {
				uni.showToast({
					title: '活动' + this.toolList[index].name,
					icon: 'none'
				});
			}
		},

		//判断弹什么框
		isShowWhatBox() {
			const that = this;
			let activeStatuList = that.activeStatuList;
			let listIndex = -1; // 判断是否弹过促销框和优惠框

			let flag = 0; //0-都没弹过，1-都弹过，2-只弹过促销框，3-只弹过优惠框

			activeStatuList.forEach((item, index) => {
				if (item.marchantId == that.marchantId) {
					if (item.isPromotion == true) {
						if (item.isDiscount == true) {
							flag = 1; //都弹过
						} else {
							flag = 2; //只弹过促销框

							listIndex = index;
						}

						return;
					}

					if (item.isDiscount == true) {
						if (item.isPromotion == true) {
							flag = 1; //都弹过
						} else {
							flag = 3; //只弹过优惠框

							listIndex = index;
						}

						return;
					}
				}
			}); // flag：0-都没弹过，1-都弹过，2-只弹过促销框，3-只弹过优惠框

			if (flag == 0) {
				//都没弹过
				activeStatuList.push({
					marchantId: that.marchantId,
					isPromotion: true,
					isDiscount: false,
					discountNum: 0
				});
				that.setData({
					// isPromotion: true
					isPromotionIcon: true
				}); // 优惠判断

				that.isShowSale();
			} else if (flag == 1 || flag == 2) {
				//都弹过、弹过促销框
				that.setData({
					isPromotionIcon: true
				}); // 优惠判断

				that.isShowSale();
			} else if (flag == 3) {
				//弹过优惠框
				activeStatuList[listIndex].isPromotion = true;
				that.setData({
					isPromotion: true
				}); // 优惠判断

				that.isShowSale();
			}

			app.globalData.activeStatuList = this.activeStatuList;
		},

		/** 促销是否弹窗 */
		isShowPromotion() {
			const data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/commodity/queryPromotionList', data).then(res => {
				if (res.data.code == 200) {
					if (res.data.data.length) {
						this.isShowWhatBox(); //判断弹什么框
					}
				}
			});
		},

		// 关闭促销弹窗
		promotionClose() {
			this.setData({
				isPromotion: false,
				isPromotionIcon: true
			});
			this.isShowSale();
		},

		// 进入促销列表
		promotionEnter() {
			this.setData({
				isPromotion: false,
				isPromotionIcon: true
			});
			uni.navigateTo({
				url: './promotionList/promotionList?marchantId=' + this.marchantId + '&marchantName=' + this.markerInfo.nickName
			});
		},

		// 进入游戏抽奖列表
		yxcjEnter() {
			uni.navigateTo({
				url: '/pages/activity/yxcj/activeList/activeList?marchantId=' + this.marchantId
			});
		},

		// 优惠是否弹框
		isShowSale() {
			let data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/coupons/queryCouponsGet', data).then(res => {
				if (res.data.code == 200) {
					if (res.data.data.length) {
						let saleCanList = [];
						res.data.data.forEach(item => {
							let endTime = formate.formatDateTime2(item.endTime);
							item.endTime = endTime.split(' ')[0];
							let startTime = formate.formatDateTime2(item.startTime);
							item.startTime = startTime.split(' ')[0];

							if (item.isDraw == 0) {
								saleCanList.push(item);
								this.setData({
									isDiscount: true,
									saleState: '点击领券'
								});
							}

							item.endTime = formate.formatDate(item.endTime);
						});
						this.setData({
							saleCanList: saleCanList
						});
						app.globalData.activeStatuList = this.activeStatuList;
					}
				}
			});
		},

		// 关闭优惠弹窗
		closeSale() {
			this.setData({
				isDiscount: false
			});
		},

		receiveSale() {
			var data = {
				couponsIds: []
			};
			this.saleCanList.forEach(item => {
				if (item.isDraw == 0) {
					data.couponsIds.push(item.id);
				}
			});
			data.couponsIds = data.couponsIds.toString();
			var token = uni.getStorageSync('token');
			app.globalData.sjrequest('/coupons/getCoupons', data, token).then(res => {
				if (res.data.code == 200) {
					this.setData({
						isDiscount: false
					});
					uni.showToast({
						title: '领取成功',
						icon: 'none'
					});
					this.getCouponList();
					this.reCoupons();
				}
			});
		},

		toMe() {
			uni.switchTab({
				url: '/pages/tabPage/me/me'
			});
		},

		// tabbar
		changeTab(e) {
			// 接收传过来的tab名称
			let text = e.detail;
			let loadedList = this.loadedList;
			loadedList[text] = true;
			this.setData({
				nowTabbarText: text,
				loadedList: loadedList
			}); // 切换category-pages组件后，开始渲染里面的rig-height组件高度

			if (text == '首页') {
				uni.setNavigationBarTitle({
					title: this.appName ? this.appName : ''
				});
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			}

			uni.navigationStyle;

			if (text == '活动') {
				uni.setNavigationBarTitle({
					title: '活动'
				}); // this.getCategoryGoodsList()//5.30注
				// this.getAuctionList()
			}

			if (text == '热卖') {
				uni.setNavigationBarTitle({
					title: '热卖'
				}); // this.getVideoList()//5.30注
			}

			if (text == '购物车') {
				uni.showLoading({
					title: '加载中'
				});
				this.getCartData();
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				uni.setNavigationBarTitle({
					title: '购物车'
				});
			}

			if (text == '订阅通知') {
				uni.setNavigationBarTitle({
					title: '订阅通知'
				});
			}

			if (text == '我的') {
				this.getOrderNum();
				this.getUserIntegral();
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				uni.setNavigationBarTitle({
					title: '我的'
				});
			}

			if (text == '会员') {
				uni.setNavigationBarTitle({
					title: '会员'
				});
			}

			if (text == '商品推荐') {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
				uni.setNavigationBarTitle({
					title: '商品推荐'
				});
			}

			if (text == '活动专区') {
				uni.setNavigationBarTitle({
					title: '活动专区'
				});
			}
		},

		// 去下单
		goBuy(e) {
			var item = e.currentTarget.dataset.item;
			item.stock = '请选择规格';
			item.itemText = '请选择规格';
			this.setData({
				goodsData: item,
				buyNum: 1,
				skuActive: null,
				show: true
			});
			this.getSku(item.id);
		},

		// 获取数字
		getOrderNum() {
			var data = {
				type: 2,
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/basic/queryCountAmount', data).then(res => {
				console.log(res,'mmnn');
				var result = res.data.data || {};
				var orderNum = [result.citywideOrderState0, result.citywideOrderState1, result.citywideOrderState2, 0, result.citywideRefundState];
				var cityOrderNum = [result.sendState0, result.sendState1, result.sendState2];
				let couponNum = 'headList[1].num';
				var toStoreOrderNum = [result.fetchState0, result.fetchState1, 0];
				var toolsListNums = this.toolsListNums;
				toolsListNums = {
					tsfyOrderCount: result.tsfyOrderCount,
					//推荐返利订单数
					jsmsOrderCount: result.jsmsOrderCount,
					//秒杀订单数
					ttptOrderCount: result.ttptOrderCount //拼团订单数
				};
				this.headList[1].num = result.countUserCoupons;
				this.setData({
					orderNum,
					cityOrderNum,
					toStoreOrderNum,
					noticeNum: result.sumCount,
					CouponsNum: result.countUserCoupons,
					toolsListNums
				});
			});
		},

		toWrite() {
			uni.navigateTo({
				url: `/pages/Index/dynamic/postComment/postComment?marchantId=${this.marchantId}`
			});
		},

		// 点赞/取消
		operationPraise(e) {
			console.log(e,'yuyu');
			const { id, idx } = e.currentTarget.dataset;
			let data = {
				commentId: id
			};
			return app.globalData.sjrequest('/marchant/operationPraise', data).then(res => {
				let isPraise = 'commentList[' + idx + '].isPraise';
				let praise = 'commentList[' + idx + '].praise';

				if (this.commentList[idx].isPraise) {
					this.commentList[idx].praise = this.commentList[idx].praise - 1;
					this.commentList[idx].isPraise = 0;
				} else {
					this.commentList[idx].praise = this.commentList[idx].praise + 1;
					this.commentList[idx].isPraise = 1;
				}
			});
		},

		// 更多评论
		toMore() {
			uni.navigateTo({
				url: `/pages/Index/dynamic/commentList/commentList?marchantId=${this.marchantId}&stick=1`
			});
		},

		//  我的
		pagesTo(e, _dataset) {
			/* ---处理dataset begin--- */
			this.datasetHandle(e, _dataset);
			/* ---处理dataset end--- */
			var idx = e.detail;

			switch (idx) {
				case 0:
					uni.navigateTo({
						url: this.toolOrderList[idx].url + `?marchantId=${this.marchantId}&marchantName=${this.markerInfo.nickName}&logoPic=${this.markerInfo.logoPic}`
					});
					break;

				case 2:
					uni.navigateTo({
						url: this.toolOrderList[idx].url + `?marchantId=${this.marchantId}` + `&stick=2`
					});
					break;

				case 5:
					uni.navigateToMiniProgram({
						appId: 'wxcad66233bce675b4',
						path: `/pages/tabBar/home/home?marchant=${this.marchantId}`
					});

				default:
					uni.navigateTo({
						url: this.toolOrderList[idx].url + `?marchantId=${this.marchantId}`
					});
			}
		},

		// 跳推广中心
		jumptuiguan() {
			// uni.showToast({
			// 	title: '暂未开放',
			// 	icon: 'none'
			// }); 
			wx.navigateTo({
			  // url: `/pages/extension/list/list?marchantId=${this.data.marchantId}`,
			  url: `/pages/extension/list/list?marchantId=${this.marchantId}`,
			})
		},

		jumpTel() {
			uni.makePhoneCall({
				phoneNumber: this.businessInfo.telephone
			});
		},

		toWebViewPage(e) {
			var link = e.currentTarget.dataset.link;
			uni.navigateTo({
				url: '/pages/shopHome/webView/webView?link=' + link
			});
		},

		// 跳会员
		toMember() {
			uni.navigateTo({
				url: `/pages/member/card/card?marchantId=${this.marchantId}`
			});
		},

		//  暂时跳优惠券
		// 获取优惠券列表
		getCouponList() {
			let data = {
				marchantId: this.marchantId
			};
			return app.globalData.sjrequest('/coupons/queryCouponsList', data).then(res => {
				if (res.data.code == 200) {
					console.log(res.data, 'addcouponList');
					uni.hideLoading();
					this.setData({
						addcouponList: res.data.data.couponsList1.length,
						addcouponList1: res.data.data.couponsList1,
						addcouponList2: res.data.data.couponsList2,
						addcouponList3: res.data.data.couponsList3
					});
					setTimeout(() => {
						this.setData({
							loading: false
						});
					}, 500);
				}
			});
		},

		toDetail(e, _dataset) {
			/* ---处理dataset begin--- */
			this.datasetHandle(e, _dataset);
			/* ---处理dataset end--- */
			let idx = e.detail;

			switch (idx) {
				case 0:
					if (this.isIntegral) {
						uni.navigateTo({
							url: '/pages/Index/integral/integral?marchantId=' + this.marchantId
						});
					} else {
						uni.showToast({
							title: '商家未开放',
							icon: 'none'
						});
					}

					break;

				case 1:
					uni.navigateTo({
						url: '/pages/Index/couponList/couponList?marchantId=' + this.marchantId
					});
					break;

				default:
					uni.showToast({
						title: '敬请期待',
						icon: 'none'
					});
			}
		},

		// 获取用户信息
		getUserInfo() {
			let data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/userRegister/queryUserInfo', data).then(res => {
				if (res.data.code == 200) {
					uni.hideLoading();

					if (res.data.data.uniqueId) {
						uni.setStorage({
							data: res.data.data.uniqueId,
							key: 'uniqueId1',
							activityInfo: res.data.data
						});
					} // if(res.data.data.community==0){   // 未开启订阅通知
					//   let tabs = 'tabList1[5].isHave'
					//   this.setData({
					//     [tabs]:false
					//   })
					// }else{
					//   let tabs = 'tabList1[4].isHave'
					//   this.setData({
					//     [tabs]:false
					//   })
					// }
					// if(!res.data.data.statusv){   // 热卖是否开启
					//   let tabs = 'tabList1[1].isHave'
					//   this.setData({
					//     [tabs]:false
					//   })
					// }
					// if(!res.data.data.statusm){   // 会员是否开启
					//   let tabs = 'tabList1[3].isHave'
					//   this.setData({
					//     [tabs]:false
					//   })
					// }

					var wxUserInfo = uni.getStorageSync('wx_userinfo_key') || {};
					var businessItem = this.businessItem;
					var promotionStatus = res.data.data.promotionStatus;

					if (promotionStatus != 1) {
						var index = businessItem.findIndex(item => item.name == '秒杀');

						if (index !== -1) {
							businessItem.splice(index, 1);
						}
					}

					var statusm = res.data.data.statusm;

					if (statusm != 1) {
						var index = businessItem.findIndex(item => item.name == '会员专区');

						if (index !== -1) {
							businessItem.splice(index, 1);
						}
					}

					var activityList = this.activityList;
					var hasActive = res.data.data.hasActive;

					if (hasActive != 1) {
						var index = activityList.findIndex(item => item.name == '全民喊价专场');

						if (index !== -1) {
							activityList.splice(index, 1);
						}
					}

					var integralSettingStatus = res.data.data.integralSettingStatus;

					if (integralSettingStatus != 1) {
						var index = activityList.findIndex(item => item.name == '积分换好礼');

						if (index !== -1) {
							activityList.splice(index, 1);
						}
					}

					if (hasActive != 1 && integralSettingStatus != 1 && promotionStatus != 1) {
						var index = businessItem.findIndex(item => item.name == '活动专区');

						if (index !== -1) {
							businessItem.splice(index, 1);
						}
					}

					this.setData({
						userInfo: { ...res.data.data, avatarUrl: wxUserInfo.userInfo.avatarUrl, nickName: wxUserInfo.userInfo.nickName },
						businessItem,
						activityList
					});
				}
			});
		},

		//  查询用户积分
		getUserIntegral() {
			let data = {
				marchantId: this.marchantId
			};
			return app.globalData.sjrequest('/integral/queryInte', data).then(res => {
				if (res.data.code == 200) {
					let integral = 'headList[0].num';
					this[headList[0].num] = res.data.data.isopen ? res.data.data.score : 0;
					this.setData({
						jifenNum: res.data.data.score,
						isIntegral: res.data.data.isopen
					});
				}
			});
		},

		//刷新数据
		reload(e, _dataset) {
			/* ---处理dataset begin--- */
			this.datasetHandle(e, _dataset);
			/* ---处理dataset end--- */
			this.getUserInfo();
		},

		//刷新数据
		reCoupons() {
			this.isShowSale();
		},

		getCartData() {
			// 使用社交token
			const data =
				this.marchantId == -1
					? {}
					: {
							marchantId: this.marchantId
					  };
			return app.globalData.sjrequest('/commodity/queryTrolleyList', data).then(res => {
				if (res.data.code === 200) {
					uni.hideLoading();
					this.setData({
						shopCartlist: res.data.data
					});
					this.disposeData();
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		},

		//跳转商品详情
		toGoodsdetail(e) {
			uni.navigateTo({
				url: '/pages/Index/GoodsDetails/GoodsDetails?id=' + e.currentTarget.dataset.commodityid
			});
		},

		toStore(e) {
			console.log(e,'yyee');
			uni.navigateTo({
				url: '/pages/shopHome/home/home?marchantId=' + e.currentTarget.dataset.marchantid
			});
		},

		// 监听输入的值
		handleInput(e) {
			if (e.detail.value != '') {
				let value = this.validateNumber(e.detail.value);
				this.setData({
					value: parseInt(value)
				});
			}
		},

		// 校验只能输入数字
		validateNumber(val) {
			return val.replace(/^(0+)|[^\d]+/g, '');
		},

		// 弹框确定事件
		confirm(e) {
			if (this.value > this.shopCartlist[this.editObj.pi].commoditys[this.editObj.ci].inventory) {
				Toast('该宝贝不能购买更多哦');
			} else {
				var goodItem = 'shopCartlist[' + this.editObj.pi + '].commoditys[' + this.editObj.ci + '].amount';
				this.shopCartlist[this.editObj.pi].commoditys[this.editObj.ci].amount = this.value;
				this.changeCartInfo(this.editObj.pi, this.editObj.ci);
			}
		},

		// 弹框取消
		onClose() {
			this.setData({
				close: false
			});
		},

		// 处理数据
		disposeData() {
			const arr = this.shopCartlist;
			var allSelect = true;

			if (arr.length == 0) {
				allSelect = false;
			}

			arr.forEach((el, i) => {
				var listItem = 'shopCartlist[' + i + '].hj';
				var listItemSelect = 'shopCartlist[' + i + '].isSelect';
				var num = 0;
				var isSelet = true;
				el.commoditys.forEach((it, idx) => {
					if (it.isPitch) {
						num += it.originalPrice * it.amount * 100;
					} else {
						isSelet = false;
						allSelect = false;
					}
				});
				this.shopCartlist[i].isSelect = isSelet;
				this.shopCartlist[i].hj = num / 100;
			});
			this.setData({
				isAll: allSelect
			});
		},

		scrollParev(e) {
			var that = this;
			clearTimeout(this.queryTime);
			this.queryTime = setTimeout(function() {
				that.setData({
					isFixed: e.detail.isFixed
				});
			}, 100);
		},

		// 获取视频列表
		// getVideoList(){
		//   let data ={marchantId:this.data.marchantId}
		//   return app.sjrequest('/commodity/queryVideoCommodityList',data).then(res=>{
		//     if(res.data.code == 200){
		//       wx.hideLoading()
		//       let list = []
		//       if(res.data.data.length){
		//         res.data.data.forEach((item,index)=>{
		//           list.push({id:index,url:item.videoUrl})
		//         })
		//         this.setData({
		//           videoList:list,
		//           hotSaleGoodsList:res.data.data,
		//           nowSaleGoods:res.data.data[0]
		//         })
		//       }
		//     }else{
		//       wx.showToast({
		//         title: res.data.msg,
		//         icon:'none'
		//       })
		//     }
		//   })
		// },
		toBuy(e) {
			uni.navigateTo({
				url: `/pages/Index/GoodsDetails/GoodsDetails?id=${e.currentTarget.dataset.id}`
			});
		},

		// 改变视频
		bindchange(e) {
			this.setData({
				nowSaleGoods: this.hotSaleGoodsList[e.detail.activeId]
			});
		},

		//处理推荐页面组件事件
		parseRecommendEvent(e) {
			var eventType = e.eventType;

			if (eventType == 'addCart') {
				this.addCart({
					item: e.goodsInfo
				});
			}
		},

		//获取系统信息
		getSystem: function() {
			uni.getSystemInfo({
				success: res => {
					var statusHeight = res.statusBarHeight;
					var { height, top } = uni.getMenuButtonBoundingClientRect();
					var diff = top - statusHeight;
					var navTitleHeight = height + diff * 2;
					this.setData({
						statusHeight,
						navTitleHeight
					});
				}
			});
		},

		myManager(e) {
			this.setData({
				nowTabbarText: e.detail
			});
		},

		changeType(e) {
			let data = e.currentTarget.dataset;
			this.setData({
				tempId: data.id + 1
			});
		},

		bgHide() {
			app.globalData.imgFlag = true;
			this.setData({
				bgFlag: false
			});
		},

		// 骨架屏
		progressiveLoad() {
			setTimeout(() => {
				this.setData({
					loading: false
				});
			}, 1000);
		},

		// 获取视频列表 this.data.marchantId
		// getVideoList() {
		//   let data = {
		//     marchantId: this.data.marchantId
		//   }
		//   app.sjrequest('/commodity/queryVideoCommodityList', data).then(res => {
		//     if (res.data.code == 200) {
		//       wx.hideLoading()
		//       let list = []
		//       if (res.data.data.length) {
		//         res.data.data.forEach((item, index) => {
		//           list.push({
		//             id: index,
		//             url: item.videoUrl
		//           })
		//         })
		//         this.setData({
		//           videoList: list,
		//           hotSaleGoodsList: res.data.data,
		//           nowSaleGoods: res.data.data[0]
		//         })
		//       }
		//     }
		//   })
		// },
		jumpApplet(e) {
			var appId = e.currentTarget.dataset.appid;
			uni.navigateToMiniProgram({
				appId
			});
		},

		bindGetUserInfo() {
			if (this.emitAuto) {
				return;
			}

			this.emitAuto = true;
			setTimeout(() => {
				this.emitAuto = null;
			}, 1000);
			uni.getUserProfile({
				lang: 'zh_CN',
				desc: '获取用户信息',
				complete: res => {
					console.log('授权信息=====：', res);

					if (res.encryptedData) {
						this.setData({
							isAuthorization: false
						});
						uni.setStorageSync('wx_userinfo_key', res); //同意授权

						this.login();
					} else {
						//拒绝授权
						setTimeout(() => {
							uni.showToast({
								title: '授权未成功',
								icon: 'none'
							});
						}, 1000);
					}
				}
			});
		},

		cancel() {
			var pages = getCurrentPages();
			var beforePage = pages[pages.length - 2];
			uni.navigateBack({
				delta: 0,
				success: function() {
					beforePage.onLoad(app.globalData.options);
				}
			});
		},

		//登录
		login() {
			var that = this;
			var userInfo = uni.getStorageSync('wx_userinfo_key');
			var encryptedData = userInfo.encryptedData;
			var iv = userInfo.iv;
			var openid = uni.getStorageSync('thirdWxOpenId');
			let appid = uni.getStorageSync('appid');
			let data = {
				appid,
				openid,
				encryptedData,
				iv
			};
			uni.showLoading({
				title: '加载中'
			});
			app.globalData.sjrequest('/thirdWxLogin/auth', data).then(res => {
				uni.hideLoading();
				that.cancel();
				that.reload();
				that.setData({
					NickFlag: false
				});
			});
		},

		showCode(code) {
			this.setData({
				codeFlag: true,
				codeImg: code.detail[0].wechatgroupqrcode,
				codeName: code.detail[0].wechatgroupname
			});
		},

		closeCode() {
			this.setData({
				codeFlag: false
			});
		},

		getShopList() {
			var data = {
				marchantId: this.marchantId,
				pageSize: 10,
				pageCurr: 1,
				orderTemplate: 2
			};
			app.globalData.sjrequest('/commodity/queryCommodityList', data).then(res => {
				if (res.data.code == 200) {
					console.log(res.data.data,'kkkk');
					var result = res.data.data;
					this.setData({
						toShoplist: result
					});
				}
			});
		},

		getShopList2() {
			var data = {
				marchantId: this.marchantId,
				pageSize: 10,
				pageCurr: 1,
				orderTemplate: 3
			};
			app.globalData.sjrequest('/commodity/queryCommodityList', data).then(res => {
				if (res.data.code == 200) {
					var result = res.data.data;
					this.setData({
						toShoplist2: result
					});
				}
			});
		},

		getLogisticsList() {
			//获取物流商品
			app.globalData
				.sjrequest('/commodity/queryCommodityList', {
					marchantId: this.marchantId,
					pageSize: 10,
					pageCurr: 1,
					orderTemplate: 1
				})
				.then(res => {
					if (res.data.code == 200) {
						var result = res.data.data;
						this.setData({
							logisticsList: result
						});
					}
				});
		},

		WXgroup() {
			let merchantId = this.marchantId;
			// let merchantId = '484';
			console.log(merchantId,'merchantId');
			app.globalData
				.sjrequest('/marchant/selectGroupQr', {
					merchantId
				})
				.then(res => {
					console.log(res, 'resres');
					this.setData({
						codeInfo: res.data.data // codeImg:res.data.data.detail[0].wechatgroupqrcode,
						// codeName:res.data.data.detail[0].wechatgroupname
					});
				});
		},

		// 商家文化跳转页面
		aciveUrl(e) {
			let url = e.currentTarget.dataset.url;
			let marchantId = this.marchantId;
			var mainBusinessModel = this.mainBusinessModel;
			uni.navigateTo({
				url: url + '?marchantId=' + marchantId + '&mainOrderType=' + mainBusinessModel
			});
		},

		//  获取商家开屏页视频
		getImgUrl() {
			let merchantId = this.marchantId;
			app.globalData
				.sjrequest('/marchant/selectAdvertising', {
					merchantId: merchantId
				})
				.then(res => {
					if (res.data.data?.top?.fileurl) {
						res.data.data.top.fileurl = res.data.data.top.fileurl.split(',');
					}

					console.log(res.data.data, '商家视频');
					this.setData({
						settingImg: res.data.data
					});
				});
		},

		getWidth() {
			var that = this;
			var length = that.appName.length * that.size; //文字长度

			var windowWidth = 200; // 屏幕宽度

			that.setData({
				length: length,
				windowWidth: windowWidth
			});
			that.scrolltxt(); // 第一个字消失后立即从右边出现
		},

		scrolltxt: function() {
			var that = this;
			var length = that.length; //滚动文字的宽度

			var windowWidth = that.windowWidth; //屏幕宽度

			if (length > windowWidth) {
				this.setData({
					textFlag: false
				});
				var interval = setInterval(function() {
					var maxscrollwidth = length + that.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可

					var crentleft = that.marqueeDistance;

					if (crentleft < maxscrollwidth) {
						//判断是否滚动到最大宽度
						that.setData({
							marqueeDistance: crentleft + that.marqueePace
						});
					} else {
						that.setData({
							marqueeDistance: 0 // 直接重新滚动
						});
						clearInterval(interval);
						that.scrolltxt();
					}
				}, that.interval);
			} else {
				that.setData({
					marquee_margin: '1000'
				}); //只显示一条不滚动右边间距加大，防止重复显示
			}
		},

		// 商家文化接口
		getArticle() {
			let merchantId = this.marchantId;
			app.globalData
				.sjrequest('/marchant/selectArticle', {
					merchantId
				})
				.then(res => {
					let list = this.tabList1;

					if (res.data.data.length) {
						let listItem = this.businessItem;
						listItem.map((res, index) => {
							if (res.name == '商家文化') {
								listItem.splice(index, 1);
							}
						});
					}

					console.log(res.data.data.length, this.isToCity, 'datadata'); // ?. es6语法，如果有就往后读，如果没有就不往后读
					// if (res.data.data.length <= 0 && this.data.settingImg.top == null) {//6.1注

					if (res.data.data.length <= 0) {
						//只要没传商品文化 直接就不显示
						list[2].isHave = false;
					}

					this.setData({
						tabList: list,
						ArticleList: res.data.data
					}); // 做一层判断，如果商家有商家文化就开启，没有商家文化就关闭底部Tab栏
				});
		},

		titleClick(e) {
			var item = e.currentTarget.dataset.item;
			let title = item.name;
			this.setData({
				currentIndex: title,
				nowMenuItem: item
			});
		},

		// 促销
		getCategoryGoodsList() {
			var data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/commodity/queryPromotionList', data).then(res => {
				if (res.data.code == 200) {
					uni.hideLoading();
					this.setData({
						saleGoodsList: res.data.data
					});
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		},

		getMemberGoodsList() {
			var data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/commodity/queryMemberCommodityList', data).then(res => {
				if (res.data.code == 200) {
					uni.hideLoading();
					this.setData({
						memberGoodsList: res.data.data
					});
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		},

		getOrderNums() {
			//获取 访问数 销量数
			var data = {
				merchantId: this.marchantId
			};
			app.globalData.sjrequest('/marchant/dataAnalysis', data).then(res => {
				if (res.statusCode == 200 && res.data.code == 200) {
					var data = res.data.data || {};
					var accessCount = data.accessCount;

					if (accessCount > 10000) {
						accessCount = accessCount / 10000;
						accessCount = accessCount.toFixed(1) + '万';
					}

					this.setData({
						accessCount,
						orderCount: data.orderCount
					});
				}
			});
		},

		goSaleShop(e) {
			let url = e.currentTarget.dataset.url;
			let marchantId = this.marchantId;
			uni.navigateTo({
				url: url + '?marchantId=' + marchantId
			});
		},

		getMemberInfo() {
			let data = {
				marchantId: this.marchantId,
				type: 1
			};
			app.globalData.sjrequest('/member/queryMemberInfo', data).then(res => {
				if (res.data.code == 200) {
					this.setData({
						memberInfo: res.data.data
					});
				}
			});
		},

		shopRecommendList2() {
			var data = {
				marchantId: this.marchantId
			};
			app.globalData.sjrequest('/marchant/queryRecommendList', data).then(res => {
				if (res.data.code == 200) {
					var result = res.data.data;
					console.log(result, '店铺000');
					this.setData({
						shopListOther: result
					});
				}
			});
		},

		getIntegralInfo() {
			let data = {
				marchantId: this.marchantId
			};
			return app.globalData.sjrequest('/integral/queryPrize', data).then(res => {
				if (res.data.code == 200) {
					uni.hideLoading();
					this.setData({
						exchangeGoodsList: res.data.data
					});
				}
			});
		},

		getAuctionList() {
			const params = {
				pageNum: 1,
				pageSize: 2,
				merchantId: this.marchantId
			};
			app.globalData.request.auctionRequest('/auction/list', params).then(res => {
				if (res.data.code == 200) {
					let result = res.data.data;
					this.setData({
						auctionList: this.auctionList.concat(result),
						auctionNum: res.data.total
					});
				}
			});
		},

		// 获取订阅通知列表
		getCommunityList() {
			let data = {
				marchantId: this.marchantId,
				pageCurr: 1,
				pageSize: 10,
				stick: 1,
				isMarchant: 1
			};
			return app.globalData.sjrequest('/marchant/queryMarchantComment', data).then(res => {
				if (res.data.code == 200) {
					this.setData({
						commentList2s: res.data.data
					});
				}
			});
		},

		// 查询签到接口
		getSignData() {
			let data = {
				marchantId: this.marchantId,
				type: 2
			};
			app.globalData.sjrequest('/integral/operateSignin', data).then(res => {
				if (res.data && res.data.data && res.data.data.countDownTime) {
					let time1 = time.formatTimeSec(res.data.data.countDownTime);
					res.data.data.countDownTime = new Date(time1.replace(/-/g, '/')).getTime() - new Date().getTime();
					this.setData({
						signData: res.data.data
					});
				}
			});
		},

		// 弹窗活动入口跳转切换
		toActivity(e) {
			var type = e.currentTarget.dataset.type;
			var topMenuList = this.topMenuList;
			var tempId = this.tempId;
			var menuItem = topMenuList.find(item => {
				return item.code == type;
			});

			if (tempId > 4) {
				this.setData({
					currentIndex: menuItem.name,
					nowMenuItem: menuItem
				});
			} else {
				if (type == 'TJFL') {
					uni.navigateTo({
						url: '/pages/businessActivity/class_list/class_list'
					});
				} else {
					uni.navigateTo({
						url: '/pages/shopHome/activity_classity_list/activity_classity_list?type=' + type
					});
				}
			}

			var showActivityRkInfo = this.showActivityRkInfo;
			showActivityRkInfo.popupBox = false;
			this.setData({
				showActivityRkInfo
			});
		},

		closeActivityRkPopup() {
			//关闭 活动入口弹窗
			var showActivityRkInfo = this.showActivityRkInfo;
			showActivityRkInfo.popupBox = false;
			this.setData({
				showActivityRkInfo
			});
		},

		queryBrowseUser() {
			//查询浏览用户
			app.globalData
				.sjrequest('/marchant/viewRecordList', {
					merchantId: this.marchantId
				})
				.then(res => {
					if (res.statusCode == 200 && res.data.code == 200) {
						var list = res.data.data || [];
						this.setData(
							{
								browseUser: list
							},
							() => {
								this.showBrowseUser();
							}
						);
					}
				})
				.catch(err => {});
		},

		_parseDate(str, resType) {
			//resType 取值 'object' | 'number'
			var a = str.split(/[^0-9]+/);
			var date = new Date(a[0], a[1] - 1, a[2], a[3] || 0, a[4] || 0, a[5] || 0);
			return resType == 'number' ? date.getTime() : date;
		},

		_omputedDate(dateStr) {
			//计算事件发生距离当前的时间
			var createDate = this._parseDate(dateStr, 'number');

			var nowDate = new Date().getTime();
			var milliseconds = nowDate - createDate;
			var UNITS = {
				年: 31557600000,
				月: 2629800000,
				天: 86400000,
				小时: 3600000,
				分钟: 60000,
				秒: 1000
			};
			var humanize = '';

			for (var key in UNITS) {
				if (milliseconds >= UNITS[key]) {
					humanize = Math.floor(milliseconds / UNITS[key]) + key + '前';
					break;
				}
			}

			return humanize || '刚刚';
		},

		showBrowseUser() {
			//展示浏览用户
			var subscriptIndex = this.subscriptIndex; //当前浏览用户下标

			var browseUser = this.browseUser; //浏览用户列表

			if (subscriptIndex == browseUser.length) {
				setTimeout(() => {
					this.setData(
						{
							subscriptIndex: 0,
							browseUser: []
						},
						() => {
							this.queryBrowseUser();
						}
					);
				}, 30000);
			} else {
				var itemUser = browseUser[subscriptIndex];

				var humanize = this._omputedDate(itemUser.createTime);

				itemUser.humanize = humanize;
				this.setData(
					{
						showHideStyle: 'show-bur',
						browseUser
					},
					() => {
						setTimeout(() => {
							this.setData({
								showHideStyle: 'hide-bur'
							});
							setTimeout(() => {
								subscriptIndex += 1;
								this.setData(
									{
										showHideStyle: '',
										subscriptIndex
									},
									() => {
										setTimeout(() => {
											this.showBrowseUser();
										}, 1000);
									}
								);
							}, 1000);
						}, 4000);
					}
				);
			}
		},

		// 获取今日推荐列表
		async getMainGoods(orderTemplate) {
			app.globalData
				.sjrequest('/commodity//homeRecommendList', {
					marchantId: this.marchantId
				})
				.then(res => {
					if (res.data.code == 200) {
						var result = res.data.data;
						this.setData({
							mainGoodsList: result
						});
					}
				});
		},

		// 监听页面滑动处理抖音和优惠券动画
		touchMove() {
			clearTimeout(this.tiemoutId);
			clearTimeout(this.tiemoutId2);
			this.tiemoutId = setTimeout(() => {
				this.setData({
					pageScrolling: true
				});
			}, 300);
		},

		touchEnd() {
			clearTimeout(this.tiemoutId2);
			this.tiemoutId2 = setTimeout(() => {
				this.setData({
					pageScrolling: false
				});
			}, 1500);
		},

		trueFun() {},

		// 此函数不做任何处理，阻止底层页面滑动
		// 跳转到优惠券页面
		members() {
			let marchantId = uni.getStorageSync('merchantId');
			uni.navigateTo({
				url: `/pages/Index/couponList/couponList?marchantId=${marchantId}`
			});
		},

		// 611开始
		onClickAdd() {
			this.isFold = !this.isFold;
			this.isShow = false;
			console.log(this.isFold, '999666');
		},

		//611结束
		isShowTiktok() {
			this.setData({
				isTiktok: true
			});
		},

		// 复制抖音口令
		copyTiktok() {
			uni.setClipboardData({
				data: this.noticeContent[0].content
			});
		},

		// 关闭抖音弹窗
		closeTiktok() {
			this.setData({
				isTiktok: false
			});
		},

		// 关闭签到弹窗
		closeSignInPopup() {
			this.setData({
				isShowSignInPopup: false
			});
		},

		showDingYue() {
			// 获取用户信息
			var that = this;
			let appid = uni.getStorageSync('appid');
			let data = {
				authorizerAppid: appid,
				sceneTypes: [4, 7]
			};
			uni.getSetting({
				withSubscriptions: true,
				success: res => {
					console.log(res, '授权状态');
				}
			});
			app.globalData.mb2request('/subTemplate/listPriTemplateId', data).then(res => {
				let tempData = res.data.data;
				uni.requestSubscribeMessage({
					tmplIds: tempData,
					success: function(res) {
						that.setData({
							isShowSub: false
						});
						uni.getSetting({
							withSubscriptions: true,
							success: result => {
								uni.showToast({
									title: '订阅消息成功'
								});
								that.setData({
									isShowSub: false
								});
							}
						});
					},

					fail(e) {
						console.log('订阅失败');
						that.setData({
							isShowSub: false
						});
						uni.showToast({
							title: '订阅消息失败,请点击右上角三个点中的设置打开消息订阅开关',
							icon: 'none'
						});
					}
				});
			});
		},

		async getLiveList() {
			let appId = uni.getStorageSync('appid');
			let marchantId = Number(uni.getStorageSync('merchantId'));
			let data = {
				appId,
				marchantId,
				start: 0,
				// 起始拉取房间，start = 0 表示从第 1 个房间开始拉取
				limit: 10 // 每次拉取的个数上限，不要设置过大，建议 100 以内
			};

			// try {
			// 	let res = await app.globalData.sjrequest('/live/create/liveList', data);
			// 	let resData = res.data.rows.splice(0, 2);
			// 	this.setData({
			// 		hotLiveList: resData
			// 	});
			// } catch (error) {
			// 	console.log(error);
			// }
		},

		// 会员中心进入
		// 获取banner图片和商品
		async getMainBanner() {
			try {
				let merchantId = this.marchantId;
				let res = await app.globalData.mb2request('/advertising/queryAdvertising', {
					merchantId
				});

				if (res.data.code == 200) {
					this.setData({
						mainBanner: res.data.data
					});
				}
			} catch (error) {}
		},

		jumpMore(e) {
			//跳转更多列表
			let activityTag = e.currentTarget.dataset.activitytag;
			var url = '/pages/special_goods/activity-classify/activity-classify';
			url += `?tagType=${activityTag}&marchantId=${this.marchantId}`;
			uni.navigateTo({
				url
			});
		},

		membersEnt() {
			console.log(this.userInfo, '商家信息');
			uni.navigateTo({
				url: `/pages/member/card/card?marchantId=${this.marchantId}`
			});
		},

		// 跳转到签到h5页面
		toSignActivity() {
			uni.navigateTo({
				url: `../../sign-inActivity/sign-inActivity`
			});
		},

		goIntegral() {
			uni.navigateTo({
				url: `/pages/Index/integral/integral?marchantId=${this.marchantId}`
			});
		},

		goimg(e) {
			console.log(this.codeInfo, 'icon');
			let srcArr = [];

			for (let arr of this.codeInfo) {
				srcArr.push(arr.wechatgroupqrcode);
			}

			uni.previewImage({
				urls: srcArr
			});
		},

		goCoupons() {
			console.log('999');
			uni.navigateTo({
				url: `/pages/Index/couponList/couponList?marchantId=${this.marchantId}`
			});
		},

		// 跳转至领取优惠劵页
		jumpVolume() {
			uni.navigateTo({
				url: `/pages/Index/volume/volume?marchantId=${this.marchantId}`
			});
		},

		// 跳转支付页面
		jumpPayMoney() {
			uni.navigateTo({
				url: '/pages/shopHome/payMoney/payMoney'
			});
		},

		// 跳转缺省页
		jumpDefault(e) {
			let query = e.currentTarget.dataset.index;
			uni.navigateTo({
				url: '/pages/shopHome/defaultPage/defaultPage?query=' + query
			});
		},

		// 查询商家是否开启签到活动
		async getIsOpenSignIn() {
			let res = await app.globalData.sjrequest1('/operation/startStatus', {
				merchantId: this.marchantId,
				operationType: 0
			});

			if (res.data.code == 200) {
				console.log(res, '是否开启活动');
				this.setData({
					isOpenSignIn: res.data.data
				});
			}
		},

		reLogin() {
			console.log('占位：函数 reLogin 未声明');
		},

		a() {
			console.log('占位：函数 a 未声明');
		}
	}
};
</script>
<style>
@import '../iconfont/iconfont.css';
@import '../../../styles/font.css';
/* @import './home.skeleton.css'; */
/* 导入骨架屏 */
page {
	min-height: 100%;
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	background-color: #fff !important;
}
/* 新版首页样式开始22.05.26 */
.column {
	height: 120rpx;
	width: 100%;
	margin: 0 auto;
	z-index: 100;
	background-color: #fff;
	top: 140rpx;
}
.column.fixed {
	position: fixed;
}
image {
	border-radius: 10rpx;
}
.u-line-1 {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.u-line-2 {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.home .home-navbar {
	position: fixed;
	top: 0;
	width: 100%;
	background-color: #ffffff;
	z-index: 10;
}
.home .navbar .navbar-fixed {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
}
.home .navbar .navbar-fixed .navbar-content {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 15px;
	height: 45px;
	box-sizing: border-box;
}
.home .navbar .navbar-fixed .navbar-content .navbar-search {
	display: flex;
	align-items: center;
	padding: 0 10px;
	width: 100%;
	height: 30px;
	border-radius: 30px;
	background-color: #f8f8f8;
}
.home .navbar .navbar-fixed .navbar-content .navbar-search .navbar-search_icon {
	margin-right: 10px;
}
.home .navbar .navbar-fixed .navbar-content .navbar-search .navbar-search_text {
	width: 100%;
	font-size: 14px;
	color: #999;
}
.home .navbar .navbar-fixed .navbar-content.search {
	padding-left: 0;
}
.home .navbar .navbar-fixed .navbar-content.search .navbar-content__search-icons {
	margin-left: 10px;
	margin-right: 10px;
}
.home .navbar .navbar-fixed .navbar-content.search .navbar-search {
	border-radius: 5px;
}
/* 头部 轮播图 */
.carousel-section {
	position: relative;
	padding-top: 10px;
}
.carousel-section .titleNview-placing {
	height: 25px;
	box-sizing: content-box;
}
.carousel-section .titleNview-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 250rpx;
	transition: 0.4s;
	z-index: -999;
}
.carousel {
	width: 700rpx;
	margin: 0 auto;
	height: 260rpx;
	z-index: 9999;
}
.carousel .carousel-item {
	width: 100%;
	height: 100%;
	z-index: 9999;
	overflow: hidden;
}
.carousel image {
	width: 100%;
	height: 100%;
	border-radius: 10rpx;
}
/* 猜你喜欢 */
.guess-section {
	display: flex;
	flex-wrap: wrap;
	padding: 0 50rpx;
	background: #fff;
}
.guess-section .guess-item {
	display: flex;
	flex-direction: column;
	width: 48%;
	padding-bottom: 40rpx;
}
.guess-section .guess-item:nth-child(2n + 1) {
	margin-right: 4%;
}
.guess-section .image-wrapper {
	width: 100%;
	height: 330rpx;
	border-radius: 3px;
	overflow: hidden;
}
.guess-section .image-wrapper image {
	width: 100%;
	height: 100%;
	opacity: 1;
}
.guess-section .title {
	line-height: 80rpx;
}
.guess-section .price {
	color: red;
	line-height: 1;
}
.f-header {
	display: flex;
	align-items: center;
	height: 80rpx;
	padding: 6rpx 30rpx 8rpx;
	background: #fff;
}
.f-header image {
	flex-shrink: 0;
	width: 80rpx;
	height: 80rpx;
	margin-right: 20rpx;
}
.f-header .tit-box {
	flex: 1;
	display: flex;
	flex-direction: column;
}
.f-header .tit {
	line-height: 1.3;
}
/* 新版首页样式结束 */

/* 头部 */
.carousel-section {
	position: relative;
	padding-top: 10px;
}
.titleNview-placing {
	height: var(--status-bar-height);
	box-sizing: content-box;
}

.titleNview-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 350upx;
	transition: 0.4s;
}

.carousel {
	width: 700rpx;
	margin: 0 auto;
	height: 350upx;
}
.carousel-item {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

image {
	width: 100%;
	height: 100%;
	border-radius: 10upx;
}

/* 优惠券和抖音的弹窗样式 */
.tiktok-coupon {
	width: 100rpx;
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	right: 20rpx;
	bottom: 180rpx;
	z-index: 99999;
}

.tiktok-coupon image {
	width: 100rpx;
	height: 100rpx;
	margin-bottom: 10rpx;
}

.animation {
	animation-name: scrollHidden;
	animation-duration: 1s;
	animation-timing-function: ease;
	animation-fill-mode: both;
	animation-iteration-count: 1;
}

.animation-reverse {
	animation-name: scrollHiddenReverse;
	animation-duration: 1s;
	animation-timing-function: ease;
	animation-fill-mode: both;
	animation-iteration-count: 1;
}

@keyframes scrollHidden {
	from {
		right: 20rpx;
	}

	to {
		right: -48rpx;
	}
}

@keyframes scrollHiddenReverse {
	from {
		right: -48rpx;
	}

	to {
		right: 20rpx;
	}
}

/* 优惠券和抖音的弹窗样式 */
/* 首页title样式 */
.hoem-title {
	width: 100%;
	height: 160rpx;
	font-size: 38rpx;
	letter-spacing: 1rpx;
	font-weight: bold;
	display: flex;
	align-items: center;
	padding-top: 100rpx;
	box-sizing: border-box;
	position: relative;
	justify-content: center;
}

/* .hoem-title text:nth-child(1){
  font-size: 16rpx;
  font-weight: 400;
} */
/* .hoem-title text:nth-child(2){
  margin-left: 120rpx;
} */

.hoem-title .subscription {
	position: absolute;
	z-index: 200;
	right: 241rpx;
	width: 120rpx;
	height: 57rpx;
	background-color: rgb(218, 218, 218);
	border-radius: 50rpx;
}

.hoem-title .subscription text:nth-of-type(1) {
	font-size: 51rpx;
	position: absolute;
	left: 11rpx;
	top: -18rpx;
	color: #ff4833;
}

.hoem-title .subscription text:nth-of-type(2) {
	font-size: 29rpx;
	font-weight: 400;
	position: absolute;
	color: #ff4833;
	right: 18rpx;
	top: 6rpx;
}

/* 积分乐园和会员中心样式代码 */
.integral-coupon {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 25rpx;
}

.video {
	position: relative;
	display: flex;
	justify-content: center;
	margin-bottom: 40rpx;
}
.video video {
	width: 700rpx;
	height: 394rpx;
	border-radius: 10px;
	z-index: 1;
}

.video .video-img {
	position: absolute;
	top: -36rpx;
	left: 0;
	z-index: -1;
	width: 100%;
	height: 396rpx;
}

.signIn {
	margin-top: 30rpx;
	height: 235rpx;
}

.signIn image {
	width: 100%;
}

.turntable-lucky {
	margin-top: 30rpx;
	height: 255rpx;
}

.turntable-lucky image {
	width: 100%;
}

.search-container {
	height: 135rpx;
}

.search-container .relative {
	top: 30rpx;
	position: relative;
	width: 100%;
}

.search-container .relative image {
	position: absolute;
	z-index: 10;
	top: 25rpx;
	left: 23rpx;
	width: 28rpx;
	height: 28rpx;
}

.search-container .relative .search-input {
	width: calc(100% - 60rpx);
	height: 75rpx;
	border-radius: 20px;
	background-color: rgb(241, 241, 241);
	position: absolute;
	padding-left: 60rpx;
	color: #ababab;
	font-size: 32rpx;
	font-weight: 300;
}

.search-container .relative text {
	position: absolute;
	right: 30rpx;
	top: 15rpx;
	color: #f7724a;
	font-size: 32rpx;
}

.search-container .relative text::before {
	content: '';
	display: inline-block;
	background-color: #f79a7e;
	width: 1px;
	top: 8rpx;
	height: 33rpx;
	position: absolute;
	right: 80rpx;
}

/* 以上是更改的代码 */
.headpo {
	position: fixed;
	top: 0;
	left: 0;
	width: 750rpx;
	z-index: 100;
	background-color: #fff;
	opacity: 1;
	/* transition-duration: 0.5s; */
}

.xpactive {
	opacity: 1;
}

.head-shop-info-box {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 500;
	background-color: #fff;
	width: 100%;
}

.page-bg {
	background-color: #f9f9f9;
}

/* .foot{height: 80rpx;} */
/* 订阅通知 */
.dynamic-shop {
	min-height: 85vh;
	background-color: #f7f7f7;
	padding: 0rpx 0rpx 110rpx;
}

.dynamic-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
}

.right-bottom {
	width: 88rpx;
	height: 88rpx;
	position: fixed;
	bottom: 20%;
	right: 4%;
}

.support {
	font-size: 20rpx;
	text-align: center;
	color: #fff;
	font-weight: bold;
}

.support2 {
	color: #000;
}

.support text {
	padding: 0 20rpx;
}

.bgF8 {
	background-color: #f8f8f8;
}

.typechange {
	border: 1px solid #000;
	width: 60rpx;
	display: block;
	text-align: center;
}

.allPage {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	align-items: flex-end;
	align-content: center;
}

.promotion {
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.61);
	position: fixed;
	top: 60rpx;
	left: 0;
	z-index: 100;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.promotionBox-close {
	width: 60rpx;
	height: 60rpx;
	margin-top: 40rpx;
}

.promotionBox-img {
	width: 460rpx;
	height: 460rpx;
}

.promotionBox-btn {
	width: 263rpx;
	height: 56rpx;
	background: linear-gradient(90deg, #f09046, #f8d355, #f09438);
	box-shadow: 0rpx 13rpx 29rpx 0rpx rgba(152, 34, 22, 0.64);
	border-radius: 28rpx;
	font-size: 27rpx;
	font-family: Source Han Sans CN;
	font-weight: 500;
	color: #ffffff;
	line-height: 56rpx;
	text-align: center;
	margin: -150rpx 0 100rpx;
	margin-top: -150rpx;
	margin-bottom: 100rpx;
}

.discount-icon {
	width: 100rpx;
	height: 80rpx;
	position: fixed;
	bottom: 450rpx;
	right: 20rpx;
	z-index: 3;
}

/* 优惠券 */
.sale-pop-box {
	width: 493rpx;
	background-size: 100% 360rpx;
	background-repeat: no-repeat;
}

.scroll-box {
	width: 100%;
	max-height: 360rpx;
	border-radius: 0px 0px 20px 20px;
	margin-top: 340rpx;
	margin-bottom: 30rpx;
}

.sale-list-container {
	background: #d13941;
	padding: 0rpx 32rpx 32rpx;
	box-sizing: border-box;
}

.sale-list {
	width: 100%;
}

.sale-item {
	width: 100%;
	height: 96rpx;
	display: flex;
	background-size: 100% 96rpx;
	background-repeat: no-repeat;
	color: #ffffff;
	margin-top: 10rpx;
}

.sale-left {
	width: 172rpx;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ff002a;
	font-weight: bold;
}

.sale-right {
	height: 100%;
	flex: 1;
	margin-left: 20rpx;
	margin-top: 6rpx;
}

.sale-price-icon {
	font-size: 24rpx;
	line-height: 24rpx;
	margin-bottom: -10rpx;
}

.sale-price-num {
	font-size: 50rpx;
	font-family: Source Han Sans CN;
	line-height: 50rpx;
}

.sale-price-name {
	height: 28rpx;
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 28rpx;
	color: #999999;
	max-width: 200rpx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sale-over-time {
	height: 22rpx;
	font-size: 16rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 22rpx;
	color: #999999;
}

.sale-price-desc {
	height: 34rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 34rpx;
	color: #ff002a;
}

.sale-close {
	width: 60rpx;
	height: 60rpx;
	margin-top: 30rpx;
}

.sale-comfirm {
	width: 344rpx;
	height: 68rpx;
	background: #ffffff;
	box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.27);
	border-radius: 16rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #ff002a;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* 标题栏 */
.home-top-container {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-size: 100% 100%;
	z-index: 500;
}

.indexTop {
	height: 240rpx;
}

.home-top-container .title-bar {
	box-sizing: border-box;
	width: 540rpx;
}

.home-top-container .title-bar .me-img {
	width: 56rpx;
	height: 56rpx;
	margin-right: 30rpx;
}

.home-top-container .title-bar .readme-img-container {
	position: relative;
}

.home-top-container .title-bar .readme-img-container .readme-img {
	width: 384rpx;
	height: 68rpx;
}

.home-top-container .title-bar .readme-img-container .count-text {
	position: absolute;
	bottom: 0;
	left: 130rpx;
	color: #07c160;
	font-size: 24rpx;
}

.appName {
	font-size: 36rpx;
	color: #fe4f4f;
	font-weight: bold;
}

.app_desc {
	font-size: 24rpx;
	padding-left: 20rpx;
	color: #fe4f4f;
}

.app_time {
	font-size: 24rpx;
	padding-left: 20rpx;
	color: #07c160;
}

/* 顶部跳转 */
.goto {
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 68rpx;
	padding: 0 32rpx;
}

.goto .lf {
	color: #333;
}

.goto .lf text:first-child {
	font-size: 28rpx;
}

.goto .lf text:last-child {
	font-size: 16rpx;
	padding-left: 5rpx;
}

.goto .rt {
	font-size: 20rpx;
}

.goto .rt .icon {
	font-size: 20rpx;
}

.temp1_bg {
	position: fixed;
	top: 0rpx;
	height: 100vh;
	width: 100%;
	z-index: 999;
}

.temp1_bg_img {
	height: 100%;
	width: 100%;
}

.temp1_bg_btn {
	text-align: center;
	color: #fff;
	border-radius: 20px;
	width: 212rpx;
	height: 76rpx;
	line-height: 76rpx;
	background-color: #7091f6;
	position: absolute;
	left: 50%;
	bottom: 2%;
	transform: translate(-50%, -50%);
}

.bg_AllPage_1 {
	background-color: #d6000c;
}

.bgsss1 {
	background-image: none !important;
	background-color: #d6000c;
}

.bg_AllPage_2 {
	background-color: #111833;
}

.bg_AllPage_3 {
	background-color: #f9f9f9;
}

.bg_AllPage_4 {
	background-color: #9ec06c;
}

.bgsss2 {
	background-image: none !important;
	background-color: #111833;
}

.appName {
	color: #fae8dd;
	font-size: 60rpx;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
}

.font-cc {
	justify-content: center;
}

.bgFFF {
	background-color: #fff;
}

.bgFFF .appName {
	color: #000000;
	font-family: '';
	font-size: 30rpx;
}

.pageBgWhite {
	background-color: #fff;
}

.home-top-container .cBlack {
	color: #000 !important;
}

.sale_name {
	width: 430rpx;
	height: 83rpx;
	margin-bottom: 36rpx;
}

.sale_list {
	width: 473rpx;
	background-color: #fff;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 45rpx 0rpx 0rpx;
}

.sale-item-list:last-child {
	margin-bottom: 0rpx;
}

.sale-item-list {
	width: 414rpx;
	height: 130rpx;
	background-size: 100% 100%;
	margin-bottom: 20rpx;
}

.sale_left_name {
	font-size: 22rpx;
	font-weight: bold;
	color: #28333f;
}

.sale_left_desc {
	font-size: 18rpx;
	color: #28333f;
}

.sale_left_time {
	font-size: 18rpx;
	color: #888888;
}

.sale_left {
	justify-content: space-between;
	height: 110rpx;
	margin: 10rpx;
	flex-shrink: 0;
	width: 260rpx;
}

.sale_right {
	color: #fff;
}

.sale_money {
	font-size: 42rpx;
	font-weight: bold;
}

.sale_bgfoot {
	width: 510rpx;
	height: 260rpx;
	background-size: 100% 100%;
}

.sale_btns {
	width: 400rpx;
	height: 144rpx;
	background-size: 100% 100%;
	text-align: center;
	line-height: 144rpx;
	color: #fff;
	font-size: 32rpx;
	font-weight: bold;
}

.wenhua-gif-img {
	width: 750rpx;
	height: 216rpx;
}

/* 联盟门店 */
.union-shop {
	margin-top: 40rpx;
}

.union-shop .title-box {
	margin-bottom: 34rpx;
}

.union-shop .adorn-img {
	width: 41rpx;
	height: 29rpx;
}

.union-shop .title-text {
	font-size: 40rpx;
	color: #fff;
	font-weight: bold;
	margin: 0 20rpx;
}

.union-shop-img-box:not(:last-child) {
	margin-bottom: 20rpx;
}

.union-shop-img {
	width: 686rpx;
	height: 158rpx;
	border-radius: 10rpx;
}

.mask_login {
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	position: fixed;
}

.bg_white {
	background-color: rgba(0, 0, 0, 0.048) !important;
}

.code_content {
	width: 344rpx;
	height: 486rpx;
	background-color: #fff;
	border-radius: 40rpx;
	font-size: 24rpx;
}

.code_title {
	padding: 0rpx 40rpx 0rpx;
	color: #000;
	text-align: center;
}

.code_img {
	width: 244rpx;
	height: 244rpx;
	background-color: #000;
	margin: 10rpx 0rpx;
}

.code_itemName {
	color: #fe4f4f;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.cide_btn {
	color: #fff;
	background-color: #fe4f4f;
	border: 1px solid #fe4f4f;
	padding: 8rpx 36rpx;
	border-radius: 8rpx;
}

.page_right_img {
	position: fixed;
	right: 40rpx;
	bottom: 120rpx;
}

.page_right_img > image {
	width: 120rpx;
	height: 116rpx;
	margin-bottom: 20rpx;
}

.container2 {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	width: 400rpx;
}

.scrolltxt {
	padding: 0 20rpx;
}

.marquee_box {
	position: relative;
	color: #333;
	height: 90rpx;
	display: block;
	overflow: hidden;
}

.marquee_text {
	white-space: nowrap;
	position: absolute;
	top: 0;
	font-size: 14px;
	height: 90rpx;
	line-height: 90rpx;
}

.culture-box .textColor3 {
	color: #000;
}

.header {
	margin-left: 20rpx;
}

.header_Img {
	width: 84rpx;
	height: 84rpx;
	border-radius: 50rpx;
	z-index: 500;
}

.bg_AllPage {
	background-color: #111833;
}

.mask_login {
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	position: fixed;
}

.bg_white {
	background-color: rgba(0, 0, 0, 0) !important;
}

.code_content {
	width: 344rpx;
	height: 486rpx;
	background-color: #fff;
	border-radius: 40rpx;
	font-size: 24rpx;
}

.code_title {
	padding: 0rpx 40rpx 0rpx;
	color: #000;
	text-align: center;
}

.code_img {
	width: 244rpx;
	height: 244rpx;
	background-color: #000;
	margin: 10rpx 0rpx;
}

.code_itemName {
	color: #fe4f4f;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.cide_btn {
	color: #fff;
	background-color: #fe4f4f;
	border: 1px solid #fe4f4f;
	padding: 8rpx 36rpx;
	border-radius: 8rpx;
}

.header_Info {
	color: #fff;
	padding-left: 10rpx;
	display: flex;
	flex-direction: row;
}

.header_Info .tscl {
	display: flex;
	align-items: center;
	margin-left: 20rpx;
}

.appName_info {
	font-size: 30rpx;
	font-weight: bold;
}

.btn_sales {
	background-color: #ff4545;
	border-top-left-radius: 18rpx;
	border-top-right-radius: 18rpx;
	border-bottom-right-radius: 18rpx;
	font-size: 22rpx;
	padding: 0rpx 10rpx;
	/* height: 34rpx; */
}

.msg_Btn {
	color: #fff;
	font-size: 24rpx;
	background-color: #ff4545;
	border-radius: 32rpx;
	padding: 10rpx 24rpx;
	position: relative;
	right: 15rpx;
}

/* 首页背景 */
.bg_AllPage5 {
	background-color: #111833;
	color: #fff !important;
}

.bg_body5 {
	background-color: #111833;
}

.page-foot5 {
	color: #fff !important;
	background-color: #111833;
}

.text-color5 {
	color: #fff !important;
}

.cur-temp5 {
	background-color: #fff !important;
}

.bg_AllPage6 {
	background-color: #95b966;
}

.page-foot6 {
	color: #000 !important;
	background-color: #f5f0eb;
}

.bg_body6 {
	background-color: #f5f0eb;
}

.text-color6 {
	color: #fff !important;
}

.cur-temp6 {
	background-color: #fff !important;
}

.bg_AllPage7 {
	background-color: #202021;
	color: #fff !important;
}

.bg_body7 {
	background-color: #202021;
}

.page-foot7 {
	color: #fff !important;
	background-color: #202021;
}

.text-color7 {
	color: #fff !important;
}

.cur-temp7 {
	background-color: #fff !important;
}

.bg_AllPage8 {
	background-color: #ffbb38 !important;
	color: #000 !important;
}

.bg_body8 {
	background-color: #f5f0eb !important;
}

.text-color8 {
	color: #000 !important;
}

.cur-temp8 {
	background-color: #000 !important;
}

.page-foot8 {
	color: #000 !important;
	background-color: #ffbb38;
}

.bg_AllPage2 {
	background-color: #111833;
}

.top-box-bg4 {
	background-color: #5db6fa;
}

.bg_AllPage2 .app-name {
	color: #fff;
}

.page-foot2 {
	background-color: #111833;
	color: #fff;
}

.top-box-bg3 .app-name {
	color: #333;
}

.page-foot3 {
	color: #000;
	margin-top: 20rpx;
	height: 50rpx;
}

.page-foot-text3 {
	color: #000;
}

.bg_AllPage1 {
	background-color: #f7f7f7;
}

.top-box-bg1 {
	background-color: #f69761;
}

.bg_AllPage1 .app-name {
	color: #333;
}

.page-foot1 {
	background-color: #f7f7f7;
	color: #333;
}

.page-foot-text1 {
	color: #fff;
}

.bg_AllPage4 {
	background-color: #f7f7f7;
}

.bg_AllPage4 .app-name {
	color: #333;
}

.page-foot4 {
	background-color: #f7f7f7;
	color: #333;
}

.page-foot-text4 {
	color: #fff;
}

/* 611开始 */
.marquee_box {
	width: 100%;
	/* height: 65rpx; */
	position: relative;
	color: #959595;
	overflow: hidden;
	display: flex;
}
.marquee_text {
	height: 64rpx;
	line-height: 64rpx;
	white-space: nowrap;
	font-size: 24rpx;
	display: flex;
	align-items: center;
	margin-left: 20rpx;
}
.marquee_text image {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-right: 10rpx;
}

/* 611结束 */

.slogan-container .single {
	width: 700rpx;
	margin: 0 auto;
	/* height: 570rpx; */
	background-color: rgb(243 243 243);
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-bottom: 20rpx;
	margin-bottom: 30rpx;
}
.slogan-container .single image {
	width: 700rpx;
	height: 376rpx;
	border-radius: 20rpx 20rpx 0 0;
}
.slogan-container .single text {
	font-size: 28rpx;
	width: 636rpx;
	/* height: 160rpx; */
	margin-top: 28rpx;
	letter-spacing: 1rpx;
}

/* 首页块 */
.product1_list {
	box-sizing: border-box;
	border-radius: 20rpx;
	padding: 0rpx 16rpx;
	white-space: nowrap;
}

.List1_title {
	position: relative;
	margin: 0rpx 40rpx;
	font-size: 24rpx;
	height: 65rpx;
	color: #b6b7bb;
	justify-content: center;
}

.cur {
	color: #fe4f4f;
	font-size: 30rpx;
	font-weight: bold;
	position: relative;
}

.cur .findIndex {
	width: 50rpx;
	height: 8rpx;
	background-color: #fff;
	position: absolute;
	bottom: 0rpx;
	border-radius: 20rpx;
}

.List3_title {
	margin-right: 70rpx;
	font-size: 30rpx;
	color: #fff;
	font-weight: bold;
	height: 60rpx;
}

.Index_Item {
	position: fixed;
	z-index: 999;
	width: 100%;
}

.Index_Item_info {
	position: fixed;
	z-index: 500;
	width: 100%;
	padding: 15rpx 0;
}

.header_bgImg {
	background-size: 100% 100%;
	width: 100%;
	position: relative;
}

.foot {
	height: 145rpx;
	background-color: #f7f7f7;
}

.top_img_bg {
	height: 240rpx;
	width: 100%;
}

.bgsss {
	background-color: rgba(0, 0, 0, 0.4);
	position: absolute;
	height: 240rpx;
	width: 100%;
	top: 0rpx;
	background-size: 100% 100%;
}

/* 拼团、秒杀、推荐返利 活动入口弹窗 */
.activity-rk-popup-box {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 600;
	background-color: rgba(0, 0, 0, 0.5);
}

.activity-rk-popup-box .entrance-top-img {
	width: 520rpx;
	height: 252rpx;
}

.activity-rk-popup-box .entrance-img {
	width: 520rpx;
	height: 166rpx;
}

/* 浏览用户 */
.browse-user {
	position: fixed;
	top: 400rpx;
	right: 50rpx;
	font-size: 24rpx;
	color: #fff;
	border-radius: 26rpx;
	padding-right: 15rpx;
	opacity: 0;
	background-color: rgba(0, 0, 0, 0.5);
	transition: all 1s linear;
}

.browse-user .user-avatar-img {
	width: 50rpx;
	height: 50rpx;
	background-color: #ccc;
	margin-right: 20rpx;
	border-radius: 50%;
}

.show-bur {
	opacity: 1;
	top: 350rpx;
}

.hide-bur {
	opacity: 0;
	top: 250rpx;
}

/* 新优惠券弹窗样式 */
.coupon-window-bgc {
	position: fixed;
	background-color: rgba(43, 43, 43, 0.274);
	top: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
}

.coupon-window-bgc .coupon-window {
	width: 600rpx;
	height: 1148rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.coupon-window-bgc .coupon-window .accept {
	width: 324rpx;
	height: 88rpx;
	margin-top: 15rpx;
	z-index: 30;
}

.coupon-window-bgc .coupon-window .coupon-image {
	position: absolute;
	top: 0;
	width: 600rpx;
	height: 974rpx;
}

.coupon-window-bgc .coupon-window .coupon-image-shadow {
	position: absolute;
	bottom: 26px;
	width: 605rpx;
	height: 1144rpx;
	z-index: 24;
}

.coupon-window-bgc .coupon-window .coupon-content-container {
	width: 536rpx;
	max-height: 600rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single {
	justify-content: space-between;
	display: flex;
	position: relative;
	margin-bottom: 10rpx;
	width: 540rpx;
	height: 140rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single > image {
	position: absolute;
	top: 0;
	width: 535rpx;
	height: 132rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .price {
	position: relative;
	left: -3rpx;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 155rpx;
	height: 130rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .price text:nth-of-type(1) {
	color: #e81d31;
	font-size: 26rpx;
	margin: 10px -2px 0 0px;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .price text:nth-of-type(2) {
	color: #e81d31;
	font-size: 48rpx;
	font-weight: 500;
	letter-spacing: -1rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .text {
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	z-index: 1;
	top: 0;
	width: 400rpx;
	height: 140rpx;
	left: 30rpx;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .text text:nth-of-type(1) {
	font-size: 33rpx;
	color: #ab3007;
}

.coupon-window-bgc .coupon-window .coupon-content-container .coupon-content-single .text text:nth-of-type(2) {
	font-size: 22rpx;
	letter-spacing: 2rpx;
	color: #ff926e;
}

.close {
	width: 68rpx;
	height: 68rpx;
	margin-top: 60rpx;
}

/* 新优惠券弹窗样式 */

/* 抖音弹窗样式 */
.tiktok-window-bgc {
	position: fixed;
	background-color: rgba(43, 43, 43, 0.274);
	top: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	z-index: 200;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tiktok-window-bgc .tiktok-cont {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 580rpx;
	height: 548rpx;
}

.tiktok-window-bgc .tiktok-cont .tiktok-bgc {
	position: absolute;
	width: 580rpx;
	height: 548rpx;
}

.tiktok-window-bgc .tiktok-cont text {
	position: absolute;
	top: 230rpx;
	width: 250rpx;
	height: 88rpx;
	text-align: center;
}

.tiktok-window-bgc .tiktok-cont .copy {
	position: absolute;
	bottom: 25rpx;
	z-index: 20;
	width: 468rpx;
	height: 88rpx;
}

.tiktok-window-bgc .tiktok-cont .close-tiktok {
	position: absolute;
	bottom: -100rpx;
	width: 68rpx;
	height: 68rpx;
}

/* 抖音弹窗样式 */
/* 签到弹窗样式 */

.signIn-window-bgc {
	position: fixed;
	background-color: rgba(43, 43, 43, 0.411);
	top: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	z-index: 200;
	display: flex;
	justify-content: center;
	align-items: center;
}

.signIn-window-bgc .signIn-cont {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 580rpx;
}

.signIn-window-bgc .signIn-cont .signIn-bgc {
	width: 612rpx;
}

.signIn-window-bgc .signIn-cont .jumpToSignIn {
	width: 580rpx;
	height: 90rpx;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
}

.signIn-window-bgc .signIn-cont .jumpToSignIn text {
	position: relative;
	z-index: 1;
	color: #fff;
	font-size: 30rpx;
	font-weight: bold;
}

.signIn-window-bgc .signIn-cont .jumpToSignIn image {
	width: 490rpx;
	position: absolute;
	top: -27rpx;
}

.signIn-window-bgc .signIn-cont .close-signIn {
	margin-top: 30rpx;
	width: 68rpx;
	height: 68rpx;
}

/* 签到弹窗样式 */

/* 新版通知 */
.store-dynamic-top {
	width: 100%;
	display: flex;
	justify-content: center;
}
.store-dynamic-img-bg {
	width: 710rpx;
	height: 74rpx;
	vertical-align: middle;
}
/* 商家动态 */
.store-danamic-item {
	width: 100%;
	height: 100%;
	background-color: #fff;
	border-radius: 16rpx;
}
.store-bottom-solid {
	width: 100%;
	height: 4rpx;
	background: #fe4a0b;
	margin-left: 0rpx;
	transition: margin-left 0.3s;
}
.store-danamic-content {
	width: 100%;
	height: 750rpx;
	padding: 20rpx;
	box-sizing: border-box;
}
.store-info-box {
	width: 100%;
	height: 62rpx;
	display: flex;
	align-items: center;
}
.store-dynamic-logo {
	width: 62rpx;
	height: 62rpx;
	border-radius: 50%;
}
.store-dynamic-box-info {
	flex: 1;
	margin-left: 20rpx;
}
.store-dynamic-name {
	height: 34rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 34rpx;
	color: #333333;
}
.store-dynamic-time {
	height: 28rpx;
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 28rpx;
	color: #333333;
}
.dingyue-btn {
	width: 110rpx;
	height: 46rpx;
	background: rgba(254, 74, 11, 0.25);
	border-radius: 26rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #fe4a0b;
}
.store-dynamic-text {
	width: 100%;
	margin-top: 16rpx;
	height: 72rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 36rpx;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	vertical-align: middle;
}
.store-dynamic-img-list {
	width: 100%;
	display: flex;
	padding: 20rpx 0;
}
.store-dynamic-img {
	width: 320rpx;
	height: 320rpx;
	margin-right: 20rpx;
	border-radius: 10rpx;
	position: relative;
}
.store-dynamic-big-img {
	width: 540rpx;
	height: 540rpx;
}
.store-dynamic-img-more {
	width: 86rpx;
	height: 38rpx;
	background: #fe4a0b;
	border-radius: 20rpx 0rpx 0rpx 20rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 0;
	bottom: 20rpx;
}
/* 商品 */
.dynamic-goods-container {
	width: 100%;
	height: 220rpx;
	padding: 20rpx;
	border-top: 2rpx solid #f4f4f4;
	box-sizing: border-box;
	display: flex;
}
.dynamic-goods-container-img {
	width: 180rpx;
	height: 180rpx;
	border-radius: 10rpx;
}
.dynamic-goods-container-content {
	flex: 1;
	height: 180rpx;
	margin-left: 18rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.dynamic-goods-container-name {
	width: 100%;
	height: 40rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 40rpx;
	color: #333333;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.dynamic-goods-container-text {
	width: 100%;
	max-height: 64rpx;
	font-size: 22rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 32rx;
	color: #666;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.dynamic-goods-bottom {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.dynamic-goods-container-price {
	height: 44rpx;
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 44rpx;
	color: #ff0000;
}
.dynamic-goods-container-btn {
	width: 160rpx;
	height: 50rpx;
	background: linear-gradient(180deg, #f95244 0%, #ff1400 100%);
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #ffffff;
}
.store-dynamic-bottom {
	width: 100%;
	height: 104rpx;
	padding: 0 156rpx;
	border-top: 2rpx solid #f4f4f4;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.store-dynamic-bottom-item {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 22rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #333333;
}
.store-dynamic-bottom-item-icon {
	width: 40rpx;
	height: 40rpx;
}
/* 优质评论 */
.user-dynamic-itme {
	width: 100%;
	background-color: #fff;
	padding: 20rpx 30rpx 20rpx 20rpx;
	box-sizing: border-box;
	margin-top: 10rpx;
	box-shadow: 0rpx 6rpx 12rpx rgba(0, 0, 0, 0.1);
}
.user-info-right-top {
	display: flex;
	align-items: start;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 34rpx;
	color: #333333;
}
.user-info-solid {
	width: 2rpx;
	height: 34rpx;
	background-color: #666;
	margin: 0 20rpx;
}
.user-info-icon {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 22rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 22rpx;
	color: #333333;
}
.user-dynamic-name-box {
	flex: 1;
	display: flex;
	align-items: center;
}
.user-dynamic-name {
	max-width: 200rpx;
	height: 34rpx;
	font-size: 24rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 34rpx;
	color: #333333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-right: 10rpx;
}
.user-dynamic-member {
	width: 28rpx;
	height: 28rpx;
	margin-right: 16rpx;
}
.user-dynamic-tip {
	width: 88rpx;
	height: 32rpx;
	background: #fe4a0b;
	border-radius: 24rpx 24rpx 24rpx 0rpx;
	font-size: 20rpx;
	font-family: HuXiaoBo-NanShen;
	font-weight: 400;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.user-dynamic-signature {
	max-width: 300rpx;
	height: 28rpx;
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 28rpx;
	color: #333333;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.user-dynamic-text {
	width: 100%;
	margin-top: 16rpx;
	max-height: 72rpx;
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: bold;
	line-height: 36rpx;
	color: #000000;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	vertical-align: middle;
}
/* 用户图片 */
.user-img-list {
	width: fit-content;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
}
.user-img-item {
	width: 320rpx;
	height: 320rpx;
	border-radius: 10rpx;
	overflow: hidden;
	margin-right: 20rpx;
}
.user-small-img {
	width: 220rpx;
	height: 220rpx;
	border-radius: 10rpx;
}
.msg_info {
	background-color: #fe4a0b;
	height: 116rpx;
	width: 100%;
	margin: 20rpx 20rpx 20rpx;
	border-radius: 16rpx;
}
.msg_info_con {
	justify-content: center;
	align-items: center;
	height: 116rpx;
	padding: 0rpx 20rpx;
}
.msg_ldang {
	flex-shrink: 0;
	width: 80rpx;
	height: 80rpx;
	margin-right: 20rpx;
}
.msg_text {
	font-size: 28rpx;
	color: #fff;
	position: relative;
}
.godynamic {
	position: absolute;
	font-size: 20rpx;
	right: 0rpx;
	bottom: 0rpx;
}
</style>
