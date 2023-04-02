<?php

namespace App\Helper;

use App\Model\DeviceDetectorModel;
use DeviceDetector\DeviceDetector;
use Symfony\Component\HttpFoundation\Request;

final class DeviceDetectorHelper
{
    public static function get(Request $request): ?DeviceDetectorModel
    {
        $deviceDetector = [];
        if ($userAgent = $request->headers->get('User-Agent')) {
            $dd = new DeviceDetector($userAgent);
            $dd->skipBotDetection();
            $dd->parse();

            $client = $dd->getClient();
            $os = $dd->getOs();
            $device = $dd->getDeviceName();
            $brand = $dd->getBrandName();
            $model = $dd->getModel();

            $clientIp = $request->getClientIp();

            $deviceDetector = new DeviceDetectorModel();
            if ($clientIp) {
                $deviceDetector->setIp($clientIp);
                $deviceDetector->setHostname(gethostbyaddr($clientIp));
            }
            if (true === is_array($client) && true === array_key_exists('name', $client) && true === array_key_exists('version', $client)) {
                $deviceDetector->setClient($client['name'].' '.$client['version']);
            }
            if (true === is_array($os) && true === array_key_exists('name', $os) && true === array_key_exists('version', $os)) {
                $deviceDetector->setOs($os['name'].' '.$os['version']);
            }
            $deviceDetector->setDevice($device);
            $deviceDetector->setBrand($brand);
            $deviceDetector->setModel($model);
            return $deviceDetector;
        }

        return null;
    }

    public static function asArray(Request $request): array
    {
        $extraFields = [];

        if ($deviceDetector = DeviceDetectorHelper::get($request)) {
            $extraFields['ip'] = $deviceDetector->getIp();
            $extraFields['hostname'] = $deviceDetector->getHostname();
            $extraFields['client'] = $deviceDetector->getClient();
            $extraFields['os'] = $deviceDetector->getOs();
            $extraFields['device'] = $deviceDetector->getDevice();
            $extraFields['brand'] = $deviceDetector->getBrand();
            $extraFields['model'] = $deviceDetector->getModel();
        }

        return $extraFields;
    }
}