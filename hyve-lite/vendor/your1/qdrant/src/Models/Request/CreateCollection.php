<?php
/**
 * Create Collection
 *
 * @since     Mar 2023
 * @author    Haydar KULEKCI <haydarkulekci@gmail.com>
 */

namespace Qdrant\Models\Request;

use Qdrant\Models\Request\CollectionConfig\DisabledQuantization;
use Qdrant\Models\Request\CollectionConfig\OptimizersConfigDiff;
use Qdrant\Models\Request\CollectionConfig\QuantizationConfig;

class CreateCollection implements RequestModel
{
    /**
     * @var VectorParams|VectorParams[]
     */
    protected array $vectors;
    protected ?int $shardNumber = null;
    protected ?int $replicationFactor = null;

    protected ?int $writeConsistencyFactor = null;

    protected ?bool $onDiskPayload = null;

    protected ?InitFrom $initFrom = null;

    protected ?OptimizersConfigDiff $optimizersConfig = null;

    protected ?QuantizationConfig $quantizationConfig = null;

    public function addVector(VectorParams $vectorParams, string $name = null): CreateCollection
    {
        if ($name !== null) {
            $this->vectors[$name] = $vectorParams->toArray();
        } else {
            $this->vectors = $vectorParams->toArray();
        }

        return $this;
    }

    public function setShardNumber(int $shardNumber): CreateCollection
    {
        $this->shardNumber = $shardNumber;

        return $this;
    }

    public function setReplicationFactor(int $replicationFactor): CreateCollection
    {
        $this->replicationFactor = $replicationFactor;

        return $this;
    }

    public function setWriteConsistencyFactor(int $writeConsistencyFactor): CreateCollection
    {
        $this->writeConsistencyFactor = $writeConsistencyFactor;

        return $this;
    }

    public function setOnDiskPayload(bool $onDiskPayload): CreateCollection
    {
        $this->onDiskPayload = $onDiskPayload;

        return $this;
    }

    public function setInitFrom(InitFrom $initFrom): CreateCollection
    {
        $this->initFrom = $initFrom;

        return $this;
    }

    public function setOptimizersConfigDiff(OptimizersConfigDiff $optimizersConfig): CreateCollection
    {
        $this->optimizersConfig = $optimizersConfig;

        return $this;
    }

    public function setQuantizationConfig(QuantizationConfig $quantizationConfig): CreateCollection
    {
        $this->quantizationConfig = $quantizationConfig;

        return $this;
    }

    public function toArray(): array
    {
        $data = [];
        if ($this->vectors) {
            $data['vectors'] = $this->vectors;
        }
        if ($this->shardNumber !== null) {
            $data['shard_number'] = $this->shardNumber;
        }
        if ($this->replicationFactor !== null) {
            $data['replication_factor'] = $this->replicationFactor;
        }
        if ($this->writeConsistencyFactor !== null) {
            $data['write_consistency_factor'] = $this->writeConsistencyFactor;
        }
        if ($this->onDiskPayload !== null) {
            $data['on_disk_payload'] = $this->onDiskPayload;
        }
        if ($this->initFrom !== null) {
            $data['init_from'] = $this->initFrom->toArray();
        }

        if ($this->quantizationConfig instanceof DisabledQuantization) {
            $data['quantization_config'] = 'Disabled';
        } else if ($this->quantizationConfig !== null) {
            $data['quantization_config'] = $this->quantizationConfig->toArray();
        }

        return $data;
    }
}