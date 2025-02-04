<?php 
if(!defined('__API')) {
    header('HTTP/1.1 403 Forbidden');
    die();
}
if(
    (count($app['url']) === 1) &&
    ($app['url'][0] === "partner-company") &&
    ($_SERVER["REQUEST_METHOD"] == "GET")
) {

    
$app['view']['page-name'] = "파트너사";

$app['view']['show-html-header'] = function() { ?> 
    <link rel="stylesheet" href="./view/partner-company/index.css?ver=2022-03-03">
    <script src="./view/partner-company/index.js?ver=2022-03-03"></script>
<?php };

$app['view']['show-page'] = function($app) { ?> 
    <?php $app['view']['header']($app) ?>
    <div class="full-page">
        <div class="page-width">
            <!-- 주한 베트남관광청 대표부 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/vietnamtourism.png" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="http://vietnamtourism.or.kr/" target="_blank">주한 베트남관광청 대표부</a></div>
                    양국 관광페이&산업 구축 제휴
                </div>
            </div>
            <!-- 케이에스넷플러스 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/ksnet_logo.gif" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="https://www.ksnet.co.kr/" target="_blank">케이에스넷플러스</a></div>
                    POS & 온오프라인 결제 및 정산 시스템<br />
                    연동기술지원
                </div>
            </div>
            <!-- 한국문화산업진흥원 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/kcipagency.png" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="http://www.kcipagency.com/" target="_blank">한국문화산업진흥원</a></div>
                    메타버스 플랫폼을 통한 문화교류 확장
                </div>
            </div>
            <!-- 헥슬란트 -->
            <div class="block">
                <div class="img">
                    <img style="filter: brightness(0);" src="../view/partner-company/images/hexlant-logo-w.png?ver=2022-03-03" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="https://hexlant.com/" target="_blank">헥슬란트</a></div>
                    콘페이 메인넷 기술지원
                </div>
            </div>
            <!-- 셀럽매니아 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/celeb-mania.png" alt="">
                </div>
                <div class="description">
                    <div class="title"><a target="_blank">셀럽매니아</a></div>
                    셀럽 & 인플루언서의 메타버스 커머스 제휴
                </div>
            </div>
            <!-- 피앤제이그룹 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/pnj.png" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="https://pnjgroup.kr/" target="_blank">피앤제이그룹</a></div>
                    버터랜드 메타버스 플랫폼 공동 마케팅 제휴
                </div>
            </div>
            <!-- 번개포토 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/55photo.png" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="https://55photo.modoo.at/" target="_blank">번개포토</a></div>
                    버터랜드 메타버스 플랫폼 공동 마케팅 제휴
                </div>
            </div>
            <!-- 브라운돈까스 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/brown_donkatu_logo.png?ver=2022-03-03" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="https://browntonkatsu.com/" target="_blank">브라운돈까스</a></div>
                    디지털 자산 결제 서비스 제휴
                </div>
            </div>
            <!-- 키스톤랩 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/keystonelab_logo.png?ver=2022-03-03" alt="">
                </div>
                <div class="description">
                    <div class="title"><a target="_blank">키스톤랩</a></div>
                    블록체인 연구 개발
                </div>
            </div>
            <!-- 퓨처에셋파이낸셜 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/futureassat_logo.png?ver=2022-03-03" alt="">
                </div>
                <div class="description">
                    <div class="title"><a target="_blank">퓨처에셋파이낸셜</a></div>
                    IPFS 데이터 운용관리
                </div>
            </div>
            <!-- 셀렉터9 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/selecter9_logo.jpg?ver=2022-03-03" alt="">
                </div>
                <div class="description">
                    <div class="title"><a target="_blank">셀렉터9</a></div>
                    디지털 자산 결제 서비스 제휴<br />
                    중고차 라이브커머스 공동 마케팅
                </div>
            </div>

            <!-- 푸드 디스커버리 -->
            <div class="block">
                <div class="img">
                    <img src="../view/partner-company/images/food_discovery.gif" alt="">
                </div>
                <div class="description">
                    <div class="title"><a href="http://www.mmarket.co/" target="_blank">푸드 디스커버리</a></div>
                    POS 시스템 지원 및<br />
                    KSNET 시스템 연동 기술지원
                </div>
            </div>
        </div>
    </div>
    
<?php };
$app['view']['show-layout']($app); }